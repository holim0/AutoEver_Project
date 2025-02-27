# 현대오토에버 과제 테스트

## 1. 서비스 실행 방법

### 1. 서비스의 의존성을 설치합니다.

```
npm install
```

### 2. Next.js 개발 서버를 실행합니다.

```
npn run dev
```

## 2. 기술 스택

### 1. Next.js

FAQ 페이지는 SEO가 중요하다고 판단했습니다. 그래서 SEO 좀 더 쉽게 적용할 수 있는 Next.js를 도입을 하였습니다.

이 밖에도 Next.js를 활용하면 SSG, SSR, ISR 등 다양한 렌더링 전략을 사용할 수 있기 때문에 향후 전체 서비스를 구축한다는 관점에서 서비스에 적용하기 적합하다고 판단했습니다.

### 2. TailWind CSS

클래스 네이밍에 대한 고민 없이 미리 정의된 클래스를 조합해고 빠르게 스타일링을 할 수 있다는 장점이 있어 도입을 했습니다.

컴포넌트 파일 내에서 스타일 작업을 바로 할 수 있기때문에 스타일 파일, 컴포넌트 파일을 이동하면서 작업을 하지 않게 됩니다.

추가로 theme를 확장/설정할 수 있기 때문에 미리 정의된 색상값 등을 빠르게 가지고 와서 설정할 수 있습니다.

따라서 개발 효율성이 향상될 수 있다고 판단했습니다.

### 3. Tanstack Query

서버 데이터의 상태를 효율적으로 관리할 수 있고 캐싱 등 데이터 페칭을 최적화하기 편리하기 때문에 적합하다고 판단하여 도입했습니다.

API 요청 로직을 쉽게 구성할 수 있고 이에 따라 관련 코드도 감소할 것이라 DX 경험이 향상될 것이라 판단했습니다.

### 4. MSW

독립된 환경에서 API Handler를 구성하고 브라우저, 서버 환경 모두 지원 가능하기 때문에 도입했습니다.

### 5. ESLint, Pretteir, Lint-staged, Husky

코드의 일관된 포맷을 유지하고 문법 오류를 체크하기 위해 도입했습니다.

커밋하기 전에 현재 스테이징 상태인 코드에 대해서만 ESLint, Prettier 체크가 될 수 있도록 Husky와 Lint-staged를 활용했습니다.

---

## 3. 브랜치 전략

깃 플로우 브랜치 전략을 간소화하여서 release 브랜치에서 바로 feature 브랜치를 딸 수 있도록 했습니다.

빠르게 단일 페이지를 구성하는 상황에 적합하다고 판단하였고 실제 프로덕트를 개발함을 가정했을 때도 배포 단위에 따라 release 브랜치를 구성해 배포를 할 수 있다고 생각했습니다.

<img width="489" alt="Image" src="https://github.com/user-attachments/assets/75b84efe-60b3-4494-84cb-e9887475f5c0" />

## 4. 폴더 구조

```ts
├── app
│   ├── FAQ  // FAQ 관련 페이지를 관리하는 폴더입니다
│   │   ├── _components // FAQ에서만 사용되는 컴포넌트 폴더입니다.
│   │   │   ├── FAQ // FAQ 리스트 영역의 컴토넌트가 위치해 있습니다.
│   │   │   │   ├── FAQCategory // 카테고리 필터 컴포넌트입니다.
│   │   │   │   ├── FAQContents // FAQ 영역의 메인 컴포넌트입니다.
│   │   │   │   ├── FAQList // FAQ 리스트를 보여주는 컴포넌트입니다.
│   │   │   ├── Footer // 페이지의 Footer 컴포넌트입니다.
│   │   │   ├── Header // 페이지의 Header 컴포넌트입니다.
│   │   │   ├── NoData // 데이터가 없을 경우 보여주는 컴포넌트입니다.
│   │   │   ├── ServiceAppInfo // 위블 비즈 App 정보 영역을 구성하는 컴포넌트입니다.
│   │   │   ├── ServiceContact // 서비스 문의 영역을 구성하는 컴포넌트입니다.
│   │   │   └── UsageProcessGuide // 이용 프로세스 안내 영역을 구성하는 컴포넌트입니다.
│   │   └── page.tsx
│   ├── globals.css // 전역 CSS 파일입니다
│   ├── layout.tsx
│   └── page.tsx
├── assets // 아이콘, 이미지 등 정적 리소스를 관리하는 폴더입니다.
├── components // 전체에서 공통으로 사용할 수 있는 컴포넌트가 위치해 있는 곳입니다.
├── fonts // 서비스에서 사용되고 있는 기아 폰트가 위치한 곳입니다.
├── mocks // msw 기반의 API 모킹이 되어 있는 곳입니다.
├── utils // 서비스에서 공통적으로 사용될 수 있는 유틸성 함수가 위치해 있는 곳입니다.
```

## 5. 고민 사항 및 개선 사항

### 1. 고민 사항

서버 컴포넌트에서 미리 초기에 선택되어 있는 서비스 도입에 대한 FAQ 리스트에 대해 불러온다면 더 빠르게 사용자에게 데이터를 불러올 것이라 생각합니다.

하지만 대부분의 데이터 패칭은 유저의 검색어, 필터, 탭에 따라 호출되어야 하기 때문에 이부분이 고민이 되었습니다.

서버 컴포넌트에서 불러온 상태와 클라이언트에서 호출한 상태에 대해

현재는 모든 데이터 패칭은 클라이언트 사이드에서 하는 것으로 구현이 되어 있습니다.

제가 생각한 결론은 [해당 문서](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr)를 참고하여 서버 컴포넌트에서 `prefetchQuery`를 통해 데이터를 미리 불러오고 `dehydrate`하여 클라언트 사이드에서 호출 시에 캐싱이 되도록 하는 것입니다.

### 2. 개선 사항

제가 더 적용해볼 수 있는 개선 사항입니다.

1. 우선 현재 에러 핸들링 및 로딩 UI 등을 구현하지 못하여서 해당 부분은 Next.js에서 제공하는 error.tsx 컴포넌트나 Suspense를 활용하여 선언적으로 구현할 수 있을 것입니다.

2. 현재 탭, 필터, 검색어에 따라 FAQ 리스트를 다르게 노출하고 있습니다. 유저의 새로고침이 발생하게 되면 초기화가 됩니다. 이를 URL내 쿼리 파라미터를 적용하면 유저의 새로고침이 발생해도 선택한 필터, 탭, 검색어가 유지될 수 있을 것입니다.

예시)

`http://localhost:3000/FAQ?limit=10&offset=0&tab=CONSULT&faqCategoryID=PRODUCT&question={검색어}`
