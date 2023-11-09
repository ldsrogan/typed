# Typed ResourceList Solution

## 기본 설정

### 디자인을 위한 세팅

- [Typed Design System](https://www.npmjs.com/package/typed-design-system) 을 `install` 해보니 `@emotion/core` dependency 가 있는데 최신 버전과의 호환문제로 제대로 실행되지가 않아 `10.1.1`로 버전 다운 그레이드를해 `devDependency` 에 추가해 주었습니다. 이후, TypedIcon을 사용하는데는 Storyboard의 Icon 이름을 찾아 사용하는데 문제는 없었습니다.
- Styling을 위해 SCSS를 사용했으며, 모든 style은 개별 `component`의 이름 + `.style.scss`로 정의하여 놓았습니다.

### 구조

- 프로젝트의 기본 설정을 위해 [Vite](https://vitejs.dev/)을 사용하여 path alias등의 설정을 빠르게 할 수 있었습니다.
- 대부분의 구현 코드는 `src` 폴더에 있으며, 다음 폴더들을 포함하고 있습니다.
  - `common`: 프로젝트에서 공용으로 사용하는 정보들
  - `components`: 프로젝트에 사용되는 공용 컴포넌트들
  - `hooks`: 프로젝트에서 사용하는 공용 custom hooks
  - `pages`: 프로젝트 내에 사용되는 페이지들 (요구 사항은 하나의 페이지로 가능하기에 하나의 폴더만 존재 함)
  - `recoil`: 상태 관리를 위한 `recoil` definintions
  - `resources`: 애니메이션등 필요한 공용 리소스
  - `utilities`: 공용 유틸리티 함수들

## 구현 결과

![Url Validation](https://github.com/ldsrogan/images/assets/3027110/d5da5fd3-6b53-452c-b3ae-74ad8d0c5b7d)
