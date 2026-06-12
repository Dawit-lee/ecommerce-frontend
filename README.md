# E-Commerce Frontend

Spring Boot 백엔드와 연동되는 이커머스 프론트엔드. React + Vite 기반 SPA로 상품 탐색, 장바구니, 주문, Stripe 결제, 회원 인증 UI를 제공합니다.

- 🖥️ **백엔드 레포**: [ecommerce-backend](https://github.com/Dawit-lee/ecommerce-backend)
- 🚀 **라이브 데모**: https://ecommerce-backend-gules-eight.vercel.app

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| Core | React 19, Vite 7 |
| State | Redux Toolkit, React-Redux |
| Routing | React Router 7 |
| UI | MUI 7, Tailwind CSS 4, Emotion |
| Form | React Hook Form |
| HTTP | Axios |
| Payment | Stripe (`@stripe/react-stripe-js`) |
| Etc | react-hot-toast, swiper, react-icons |

---

## ✨ 주요 기능

- 상품 목록 · 카테고리 · 키워드 검색 (페이지네이션)
- 장바구니 담기 / 수량 변경 / 삭제
- 주문 및 배송지 관리
- Stripe 결제 연동
- JWT 기반 회원가입 / 로그인
- 관리자 / 판매자 / 사용자 역할별 화면

---

## 🚀 실행 방법

### 사전 요구사항
- Node.js 18+
- 실행 중인 [백엔드 API](https://github.com/Dawit-lee/ecommerce-backend)

### 로컬 개발

```bash
npm install
npm run dev   # http://localhost:5173
```

### 환경변수 (`.env`)

| 변수 | 설명 |
|------|------|
| `VITE_BACK_END_URL` | 백엔드 API 베이스 URL (예: `http://localhost:8080`) |
| `VITE_FRONTEND_URL` | 프론트엔드 URL (Stripe 리다이렉트용) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe 공개 키 (`pk_test_...`) |

> 로컬은 `.env` 의 값을 사용하고, 프로덕션 빌드는 `.env.production` 을 사용합니다.

---

## ☁️ 배포 (Vercel)

HTTPS로 서빙되는 프론트엔드가 HTTP 백엔드(AWS Elastic Beanstalk)를 호출할 때 발생하는
mixed-content / CORS 문제를 피하기 위해, `vercel.json` 의 rewrites 로 `/api` · `/images`
요청을 백엔드로 프록시합니다. 브라우저는 항상 동일 출처(HTTPS)로만 통신합니다.

```
브라우저 ──HTTPS──▶ Vercel(정적 + 프록시) ──HTTP──▶ Elastic Beanstalk(백엔드)
```

---

## 🗺️ 향후 개선 (Roadmap)

- [x] Vercel 프록시 기반 배포 구성
- [ ] 백엔드 HTTPS 적용 후 프록시 제거
- [ ] 코드 스플리팅으로 번들 크기 최적화
- [ ] E2E 테스트 추가
