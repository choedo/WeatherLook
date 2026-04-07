# 🌤 Weather Look (웨더룩)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-43392F?style=for-the-badge&logo=react&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

## 📝 소개 (About)

**Weather Look(웨더룩)**은 "오늘 뭐 입지?"라는 일상적인 고민을 해결해주는 AI 기반 날씨 & 코디 가이드 서비스입니다.

기상청의 정밀한 단기/중기 예보 데이터를 기반으로 하며, 단순한 기온 수치 제공을 넘어 현재의 습도와 강수확률 등을 종합적으로 분석합니다. 이를 통해 사용자에게 가장 쾌적한 옷차림과 라이프 가이드를 직관적으로 제안합니다.

## ✨ 주요 기능 (Features)

정밀한 기상청 데이터 통합 🌍: 1시간 단위의 단기예보와 일 단위의 중기예보 등 서로 다른 규격의 데이터를 하나의 일관된 주간 리포트로 가공하여 제공합니다.

AI 맞춤형 코디 추천 🤖: 현재 날씨 데이터(기온, 습도, 비 소식)를 Gemini AI 프롬프트와 결합하여 "린넨 셔츠", "레인부츠" 등 실용적이고 디테일한 코디를 생성합니다.

디테일한 라이프 가이드 💡: 습도와 강수확률에 따른 세분화된 분기 로직을 통해 우산 챙기기, 세탁 지수 등 직관적인 생활 밀착형 가이드 메시지를 제공합니다.

반응형 데이터 시각화 📊: Recharts를 활용하여 시간에 따른 기온 추이를 모바일과 데스크탑 환경 모두에서 깨짐 없이 직관적으로 시각화합니다.

## 🛠 기술 스택 (Tech Stack)

Frontend: Next.js 15 (App Router), React, TypeScript

State Management: Zustand (Client State), TanStack Query (Server State)

Styling & UI: Shadcn UI, Tailwind CSS, Recharts

API & AI: 기상청 공공데이터 API, Gemini AI

Deployment: Vercel

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하는 방법입니다.

1. 요구 사항

Node.js 18.x 이상

npm

2. 환경 변수 설정

루트 디렉토리에 `.env.local` 파일을 생성하고 아래 키를 입력하세요.

```env
# 단기 예보 API 설정
NEXT_PUBLIC_SHORT_WEATHER_BASE_URL'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0'
SHORT_WEATHER_FORECAST=당신의_기상청_공공데이터_단기예보_디코딩_키

# 중기 예보 API 설정
NEXT_PUBLIC_MIDDLE_WEATHER_BASE_URL='https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0'
MIDDLE_WEATHER_FORECAST=당신의_기상청_공공데이터_중기예보_디코딩_키

# AI API 설정
GEMINI_API_KEY=당신의_GEMINI_API_키
```

3. 설치 및 실행

# 1. 저장소 클론

git clone [https://github.com/choedo/WeatherLook](https://github.com/choedo/WeatherLook)

# 2. 프로젝트 폴더 진입

cd WeatherLook

# 3. 의존성 패키지 설치

npm install

# 4. 로컬 개발 서버 실행

npm run dev
