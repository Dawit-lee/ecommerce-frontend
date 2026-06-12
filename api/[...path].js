// Vercel 서버리스 프록시.
// 브라우저는 동일 출처(HTTPS, Vercel)로만 요청하고, 이 함수가 서버 사이드에서
// HTTP 백엔드(Elastic Beanstalk)로 우회 호출한다. (mixed-content / CORS 회피)
//
// - /api/*      → 그대로 백엔드 /api/* 로 전달
// - /images/*   → vercel.json 에서 /api/_proxy/images/* 로 rewrite → 여기서 /images/* 로 복원

const BACKEND = "http://Ecom-app-env.eba-npaqhkee.ap-northeast-2.elasticbeanstalk.com";

export default async function handler(req, res) {
  let path = req.url || "/";

  // 이미지 등 rewrite 로 들어온 경로 복원
  if (path.startsWith("/api/_proxy")) {
    path = path.slice("/api/_proxy".length) || "/";
  }

  const target = BACKEND + path;

  // 전달할 헤더 정리 (host 등 hop-by-hop 제거)
  const headers = {};
  for (const [k, v] of Object.entries(req.headers)) {
    const key = k.toLowerCase();
    if (["host", "connection", "content-length"].includes(key)) continue;
    if (typeof v !== "undefined") headers[k] = v;
  }

  const init = { method: req.method, headers, redirect: "manual" };

  // GET/HEAD 외에는 원본 바디 전달
  if (!["GET", "HEAD"].includes(req.method)) {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    if (chunks.length) init.body = Buffer.concat(chunks);
  }

  try {
    const upstream = await fetch(target, init);

    res.status(upstream.status);
    upstream.headers.forEach((value, key) => {
      const k = key.toLowerCase();
      if (["content-encoding", "transfer-encoding", "connection", "content-length"].includes(k)) return;
      res.setHeader(key, value);
    });

    const buf = Buffer.from(await upstream.arrayBuffer());
    res.send(buf);
  } catch (err) {
    res.status(502).json({ error: "Bad Gateway", message: String(err) });
  }
}
