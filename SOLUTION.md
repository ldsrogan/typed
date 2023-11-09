# Typed ResourceList Solution

## 기본 설정

### 디자인을 위한 세팅
* [Typed Design System](https://www.npmjs.com/package/typed-design-system) 을 `install` 해보니 `@emotion/core` dependency 가 있는데 최신 버전과의 호환문제로 제대로 실행되지가 않아 ``10.1.1``로 버전 다운 그레이드를해 ``devDependency`` 에 추가해 주었습니다. 이후, TypedIcon을 사용하는데는 Storyboard의 Icon 이름을 찾아 사용하는데 문제는 없었습니다.
* Styling을 위해 SCSS를 사용했으며, 모든 style은 개별 `component`의 이름 + `.style.scss`로 정의하여 놓았습니다.


### 구조
* 프로젝트의 기본 설정을 위해 [Vite](https://vitejs.dev/)을 사용하여 path alias등의 설정을 빠르게 할 수 있었습니다. 
* 대부분의 구현 코드는 `src` 폴더에 있으며, 다음 폴더들을 포함하고 있습니다.
    * `common`: 프로젝트에서 공용으로 사용하는 정보들
    * `components`: 프로젝트에 사용되는 공용 컴포넌트들
    * `hooks`: 프로젝트에서 사용하는 공용 custom hooks
    * `pages`: 프로젝트 내에 사용되는 페이지들 (요구 사항은 하나의 페이지로 가능하기에 하나의 폴더만 존재 함)
    * `recoil`: 상태 관리를 위한 `recoil` definintions
    * `resources`: 애니메이션등 필요한 공용 리소스
    * `utilities`: 공용 유틸리티 함수들

* 리소스 리스트 아이템의 기본 구성요소

```typescript
type TListType = 'youtube' | 'url' | 'img';

type TListItem = {
   id: number; // item id
  origin: string; // original data
  title: string; // title
  src: string; // resouce url or binary image data
  type: TListType; // resource type
};

```


## 구현 결과

### 리소스 추가

**URL리소스 추가 시 요구사항**

![Url Validation](https://github.com/ldsrogan/images/assets/3027110/d5da5fd3-6b53-452c-b3ae-74ad8d0c5b7d)

* `https://` 또는 `http://` scheme이 포함되도록 하기 위해 url  validate을 위한 Regular Expression을 통해 test했습니다. 만일 scheme에 맞지 않는 경우는 위와 같이 에러 메시지가 뜨고 리소스 등록이 되지 않도록 했습니다.
    * 개선할 사항이 있다면, scheme을 강제하는 것도 좋지만, `http://` 나 `https://` 가 없을 경우, 자동으로 붙도록 설정해 주는 것도 좋을거 같습니다. `placeholder`로 표기를 해 놓으면 User 입장에서도 잘 이해할 수 있을 거 같습니다.

* Youtube 링크 등록시 Embeded 링크로 변환하는 부분은 youtube에서 링크 share시 크게 두가지 타입이 있는데 youtube.com 혹은 youtu.be 가 포함되고 뒤에 video id가 붙습니다. 이 두가지 경우를 처리해 넣어줬습니다. embeded 링크가 들어올 경우는 그대로 추가될 수 있게 했습니다.
    * 개선을 위해 Backend for Frontend까지 만들려고 했으나, 개인 시간이 부족하여 추가 구현은 하다 말았습니다. BFF를 사용해 Opengraph Metadata로 thumbnail과 기타 필요 정보들을 얻어 item에 넣을 수 있습니다. 또한, frontend에서 별도로 embedded data를 처리할 필요 없이 backend에서 어떤 형태의 링크든 meta정보를 받아올때 함께 오는 default url (using 'youtube.com' format always)을 사용한다면 좀 edge 케이스 없이 쉽게 embedded link로 전환할 수 있습니다. 또한, 깨진 링크는 사전에 확인이 가능해 등록 이전에 동작 여부를 사용자에게 알려줄수도 있었을 것입니다.

**Image 리소스 추가**
* 리소스 추가시 `png/jpg`파일 형태만을 받기 위해 `input` 태그에 `supported file type`을 정의했습니다.
* 리소스가 corrupted 되었는지 확인을 위해 base64 포멧의 meta 정보와 source가 제대로 된 형태인지를 확인할수도 있었을거 같습니다.
* 리소스 추가를 위한 `input` 태그는 파일 타입의 스타일링을 위해 실제 `input` element는 숨기고, `useRef`로 컨트롤 하였습니다. 
* 동시 여러개의 파일을 올려 여러개의 리소스를 등록하기 위해 `input`태그에 multiple 옵션을 열어두었습니다.

***그외 리소스 추가시 고려해야 했던 것들***
* 리소스 등록시, 처음 등록되는 리소스는 자동 선택이 되도록 함
* 리소스 등록시, 기존 selection이 풀리지 않아야 하고, 리스트의 맨 상단으로 등록되도록 함.
* 똑같은 리소스를 등록하고 연속적으로 열람할 경우, `iframe`과 `img` 태그의 refresh가 되지 않음
    * 해결을 위해 `url`은 뒤에 random param을 넣어 cache문제를 해결함
    * img 같은 경우는 dom 구조를 변경해야 했음
    * 최종적으로는, 현재 typed에서 사용하는 방식으로 item 정보에서 original 정보를 등록해 놓고 리소스 추가시 original data 값을 비교해 같은 정보일 경우 등록을 하지 못하도록 막음


### 토스트
![Toast](https://github.com/ldsrogan/images/assets/3027110/c560ba31-470e-42d5-880b-126f7dbc18b8)

* 토스트는 상단 중앙 부분에 위치하도록 했습니다.
* 토스트는 크게 `info`, `warn`, `error` 타입으로 구분했으며, 각각 초록색, 노란색, 빨간색으로 구성되었고 custom hook을 사용해 필요할 때, 최상단 dom에 정의된 `toast-spot` 에 2.2초동안 떠 있도록 설정했습니다. 

### 리소스 등록, 수정 및 삭제
* 별도의 database를 사용하지 않았기에 `in-memory`상의 데이터로 가지고 있도록 함. 개선을 위해 `local storage`나 `Indexed DB`를 사용해 별도의 cache reset이 없이는 리소스를 브라우저에서 유지시키려고 했으나, too much라는 생각에 중단함.
* 리소스가 수정되거나 삭제될 때, 같은 순서를 유지하기 위해 `ID class`를 만들어 `singleton`방식으로 `id`를불어와 씀.
* 수정(리소스 이름 변경)이나 삭제 시, `id` 를 사용하여 삭제하거나 reordering 함


### 리소스 리스트 및 보기
* Loading 상태를 보여주기 위해 lottie 라이브러리를 활용해 리소스 변경 중간에 Loading Animation을 넣었습니다.
* Resource의 크기의 optimal 상태를 명확히 하기 어려워 `width`를 기준으로 사이즈 조절이 되도록 하였습니다.
* 일부 사이트 (예: www.google.com)는 x-frame-options 가 `sameorigin`등으로 설정되어 iframe에서 접근이 어려운 상황인데 이는 backend 설정및 리라우팅을 `cors`와 마찬가지로 간단히 해결 가능합니다.
* 리소스 리스트 추가적으로 파일인지 `url` 또는 `youtube link`인지에 대해 알수 있도록 아이콘과 text를 추가하였습니다.
* 리소스 뷰 화면에서 리소스 타이틀과 close할 수 있는 버튼을 통해 리소스 뷰를 close할 수 있도록 구현했습니다.

![resource1](https://github.com/ldsrogan/images/assets/3027110/781b586f-dea6-44b1-8ca5-0fb1090f5209)
![resource2](https://github.com/ldsrogan/images/assets/3027110/72de6025-894c-491c-b534-245584f396f2)
![resource3](https://github.com/ldsrogan/images/assets/3027110/b238bf27-8d73-4965-aa30-bcbba7ddb745)

### 그 외 개선할 점들
* 개인적인 일정에 시간을 충분히 쓰지 못하고, 빠르게 구현하느라 중간 중간 comment를 충분히 남기지 못했습니다.
* 테스트 코드를 함께 작성하려고 했는데, 시간이 충분히 못했습니다. 일반적으로는 테스트 코드를 작성해 UI의 기능이 제대로 구현 되었는지 확인합니다.
