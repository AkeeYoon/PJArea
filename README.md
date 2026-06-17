<a id="english"></a>
# PJ Area V2.1 - Hybrid Engine

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat&logo=vite&logoColor=white)

A modular, web-based utility designed to calculate and visualize projector display areas against physical wall dimensions, deployable as a single HTML file.

🌐 **Language:** [English](#english) | [한국어](#korean)

---

### 📥 Direct Download (Portable Version)
You can download the single-file portable version and use it immediately offline without any installation:
- **[👉 Download PJArea_V2.1_Portable.html (Latest Release)](https://github.com/AkeeYoon/PJArea/releases/latest/download/PJArea_V2.1_Portable.html)**
> 💡 **Tip:** If you haven't created a GitHub Release yet, you can also download the raw file from the repository:
> [Download Raw File](https://raw.githubusercontent.com/AkeeYoon/PJArea/main/PJArea_V2.1_Portable.html) *(Right-click and select "Save Link As...")*

---

## 📖 Introduction
PJ Area V2.1 is a hybrid engine tool that helps AV engineers and system integrators accurately plan projector installations. By visualizing the physical wall size and projector throw limits, it provides an intuitive interface to configure panel settings, optical adjustments, and camera placements—all bundled into a single, portable HTML file for ease of use in the field.

## ✨ Features
- **Visual Projection Mapping**: Intuitively calculate and visualize projector throw distances and display areas on physical walls.
- **Single-File Deployment**: Bundled into a single `PJArea_V2.1_Portable.html` file using Vite, allowing for offline, zero-dependency usage in the field.
- **Responsive Hybrid Engine UI**: Modern, modular interface built with React, Tailwind CSS, and Framer Motion for smooth animations and UX.
- **Enhanced Export & Quick Grid**: Support for Transparent BG, Invert Colors, and `Color Grid` texture modes when exporting PNG guide maps.
- **Intuitive Array Controls**: Easy (+)/(-) button adjustments for projector columns/rows, enhancing both mobile and desktop UX.

## 🛠 Tech Stack
- **Frontend**: React 19, Tailwind CSS v4, Motion (Framer Motion), Lucide React
- **Build Tool**: Vite (with `vite-plugin-singlefile`)
- **Scripts / Automation**: TypeScript (tsx) for automated HTML transformations

## 🚀 Installation & Execution

### Prerequisites
- Node.js 18 or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/AkeeYoon/PJArea.git
cd PJArea

# Install dependencies
npm install 
```

### Execution
```bash
# Run the development server
npm run dev

# Build for production (Generates the single HTML file in /dist)
npm run build
```

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

<a id="korean"></a>
# PJ Area V2.1 - 하이브리드 엔진

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat&logo=vite&logoColor=white)

프로젝터 투사 면적과 실제 벽면 크기를 직관적으로 계산하고 시각화하기 위해 설계된 모듈형 웹 유틸리티입니다. 단일 HTML 파일로 배포가 가능하여 현장에서 쉽게 사용할 수 있습니다.

🌐 **언어:** [English](#english) | [한국어](#korean)

---

### 📥 포터블 버전 즉시 다운로드 (Portable Version)
설치나 복잡한 개발 환경 구성 없이, 단 하나의 HTML 파일만 다운로드하여 현장에서 즉시 오프라인으로 실행할 수 있습니다:
- **[👉 PJArea_V2.1_Portable.html 다운로드 (최신 릴리즈)](https://github.com/AkeeYoon/PJArea/releases/latest/download/PJArea_V2.1_Portable.html)**
> 💡 **팁:** 아직 GitHub Release를 등록하지 않으셨다면, 아래 링크를 마우스 우클릭한 후 **"다른 이름으로 링크 저장..."**을 선택하여 다운로드할 수 있습니다:
> [Raw 파일 다운로드 링크](https://raw.githubusercontent.com/AkeeYoon/PJArea/main/PJArea_V2.1_Portable.html)

---

## 📖 소개
PJ Area V2.1은 AV 엔지니어 및 시스템 통합 전문가가 프로젝터 설치를 정확하게 계획할 수 있도록 돕는 하이브리드 엔진 도구입니다. 실제 벽면 크기와 프로젝터의 투사 한계를 시각화하여 패널 설정, 광학 렌즈 조정, 카메라 배치 등을 설정할 수 있는 직관적인 인터페이스를 제공하며, 이 모든 것이 오프라인에서도 작동 가능한 단일 HTML 파일로 번들링됩니다.

## ✨ 주요 기능 (Features)
- **프로젝션 매핑 시각화**: 실제 벽면에 대한 프로젝터 투사 거리 및 화면 면적을 직관적으로 계산하고 시각화합니다.
- **단일 파일 배포 (Single-File)**: Vite를 통해 모든 에셋이 `PJArea_V2.1_Portable.html` 단일 파일로 번들링되어, 인터넷 연결 없이 현장에서도 즉시 실행할 수 있습니다.
- **반응형 하이브리드 UI**: React, Tailwind CSS, Framer Motion을 활용하여 부드러운 애니메이션과 모던한 UX/UI를 제공합니다.
- **향상된 내보내기 (Export & Quick Grid)**: `Color Grid` 텍스처 적용, 투명 배경(Transparent BG), 색상 반전(Invert) 등을 포함한 다양한 옵션의 투명 PNG 가이드 패턴 추출을 지원합니다.
- **직관적인 조작 (Array Settings)**: 프로젝터 대수(Cols/Rows)를 쉽게 증감할 수 있는 (+)/(-) 버튼이 추가되어 모바일 및 데스크탑 환경의 조작성이 대폭 개선되었습니다.

## 🛠 기술 스택 (Tech Stack)
- **Frontend**: React 19, Tailwind CSS v4, Motion (Framer Motion), Lucide React
- **Build Tool**: Vite (`vite-plugin-singlefile` 플러그인 사용)
- **Scripts**: DOM 변환 및 패치 자동화를 위한 다수의 TypeScript 스크립트(`transform-ui.ts` 등)

## 🚀 설치 및 실행 방법

### 요구 사항 (Prerequisites)
- Node.js 18 이상

### 설치 명령어
```bash
# 저장소 클론
git clone https://github.com/AkeeYoon/PJArea.git
cd PJArea

# 의존성 설치
npm install 
```

### 실행 명령어
```bash
# 로컬 개발 서버 실행
npm run dev

# 프로덕션 빌드 (dist 폴더에 단일 HTML 파일 생성)
npm run build
```

## 📄 라이선스
이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.
