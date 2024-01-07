# 클라우드 포스

## Preview
![image](https://github.com/jobkaeHenry/cloud-pos-and-shop/assets/100949102/2d019fcf-bf3d-40da-b0bd-c7970db63a6b)

<b>[배포링크]</b><br>
<b>포스 - </b>https://pos.jobkaehenry.com/

<b>브랜드 사이트 - </b>https://myshop.jobkaehenry.com/sampleshop

## Node Version

### `v18.16.0`

## Command

### `npm start`

터미널에 npm start 커맨드를 입력시, 개발 모드로 실행됩니다

### `npm run build`

터미널에 npm run build 커맨드를 입력시, 프로덕션 모드로 빌드합니다.

## Commit Message

| Icon  | Description                |
| ----- | -------------------------- |
| New:   | 신규 기능 추가             |
| Refactor : | 기존코드 수정 / 리팩토링   |
| Fix: | 버그 / 오류 수정           |
| Minor: | 작은수정사항 (스타일변경,) |

## 개발환경

**프로그래밍 언어**<br>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/><br>

**프레임워크/라이브러리**<br>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>

**스타일링**<br>
<img src="https://img.shields.io/badge/Meterial_UI-007FFF?style=flat-square&logo=mui&logoColor=white"/> <img src="https://img.shields.io/badge/tailwindCSS-3099FB?style=flat-square&logo=tailwind-css&logoColor=white"/><br>

**상태관리**<br>
<img src="https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=recoil&logoColor=white"/><br>

## 상세설명

## ERD

![Cloud_POS](https://github.com/jobkaeHenry/cloud-pos/assets/100949102/a659f9ee-1909-4784-a77a-d86c9ca079e4)

### 로직

<details>
  <summary>장바구니 아이템 추가 로직</summary>
![image](https://github.com/jobkaeHenry/cloud-pos-and-shop/assets/100949102/eacf8e8c-73a9-43b3-9176-e93611a5a850)

상품 리스트에서 아이템을 클릭시, 장바구니에 추가됩니다.
옵션이 존재 할 경우, 옵션을 선택하는 모달창을 출력 / 옵션이 없을 경우 즉시 추가됩니다.

같은 이름의 상품이더라도 옵션에 따라 다른 아이템으로 관리하기위해 Unique Key를 새로 만드는 과정을 추가해 관리했습니다.

Unique Key 가 일치하는 아이템이 장바구니에 이미 존재할 경우, 해당 상품의 Quantity 가 변경됩니다

</details>

<details>
  <summary>카테고리 정보</summary>

서버에서 제공하는 카테고리 정보에 모두 보기를 추가해 사용하고, 카테고리를 선택하지 않은 경우 모든 아이템을 보여주도록 했습니다.

</details>

### UX / UI

<details>
  <summary>모바일기기 고려</summary>
   클라우드기반 POS가 PC / Tablet / Mobile 등 다양한 기기에서 동작하는 것을 염두해 다양한 기기에서 동일|유사한 UX를 경험할 수 있도록 고려했습니다.<br><br>

<b>[뒤로가기 버튼을 이용한 MODAL 조작]</b>
모바일기기에서는 뒤로가기 버튼을 통해 이전 작업을 취소하는 경우가 많은데, 이를 고려하여 브라우저의 뒤로가기를 이벤트를 감지해 모달을 조작할 수 있도록했습니다.

<b>소스코드</b> - @/src/hooks/useModal.ts

<b>모달이 켜질때</b> - 모달창이 켜질 경우, 브라우저 history에 {modal:true}상태와 함께 history가 추가되며 뒤로가기 이벤트를 감지하는 Listner가 부착됩니다

<b>모달이 꺼질때</b> - history의 상태에 {modal:true} 상태가 있을 경우 뒤로가기가 실행되고, 이벤트리스너를 제거합니다.

<b>뒤로가기 클릭시</b> - history의 상태에 {modal:true} 상태가 있을 경우 모달을 Unmount하고, 이벤트 리스너를 제거합니다.

<b>[반응형 디자인]</b><br><br>

</details>

<details>
  <summary>오류 회복성 확보</summary>
  <b>소스코드</b> - @/src/recoil/cart/atom/cartAtom.ts , @/src/hooks/useInitialCartItems.tsx

<b>[비정상종료대비 - 장바구니]</b>
장바구니에 아이템을 담는 과정은 유저의 입장에서 긴 고민과 노력이 들어가는 작업이고, 비정상 상황으로 유저의 작업이 종료된 경우 UX에서 좋지않은 영향을 줄 수 있습니다.

이와 같은 비정상 종료상황에 대비하기 위해 유저가 장바구니에 아이템을 추가한 경우 브라우저의 로컬스토리지에 장바구니에 담긴 아이템을 저장하고, 주문이 완료되지 않은 상태로 재접속시 이전에 담았던 아이템을 불러올 수 있도록하고, 주문 완료 시 스토리지를 비우는 형태로 구현했습니다.

</details>

<details>
  <summary>Animation을 통한 반응성개선</summary>

애니메이션 없이 아이템이 추가될 경우 유저가 장바구니에 아이템이 추가된 것을 인지하지 못할 수 있고, 사용자의 행위에 따른 즉각적인 인터랙션을 보여주지 않을 경우 사이트가 제대로 동작하지 않는다고 인식 할 수 있으므로, 반응에 대한 즉각적인 피드백을 Framer-motion 을 이용한 애니메이션으로 구현했습니다

</details>

<details>
  <summary>의도된 지연</summary>

실제 인터넷 환경에서 처리속도는 1초 미만으로 매우 빠르게 처리 되지만, 유저가 오랜기간 작성한 정보가 지나치게 빠르게 처리 될 경우 오히려 그 처리과정에 대한 신뢰성에 의심을 가지게 될 수 도 있고, 유저의 실수로 주문이 잘못되었을때 취소가 가능한 시간을 확보하는 것 역시 중요할 것이라는 판단, 의도적 지연 (Lottie 이미지 표출) 후 주문내역이 표시되도록 하였습니다

</details>

<details>
  <summary>Skeleton UI</summary>

</details>

### 협업 / DX

<details>
  <summary>JSDoc</summary>
![image](https://github.com/jobkaeHenry/cloud-pos-and-shop/assets/100949102/9afb862c-a5d9-451a-b1ee-85c843d48499)

다수의 개발자가 협업하는 상황을 고려해 함수명만으로 함수의 기능을 유추 가능하도록하되, JSDoc 을 적극 활용, 추상화 된 함수의 상세설명을 제공했습니다.

</details>

<details>
  <summary>디렉토리 구조</summary>
![image](https://github.com/jobkaeHenry/cloud-pos-and-shop/assets/100949102/e0d7ba41-d8b7-4cbf-9638-8742e2ba9526)

디렉토리 구조는 크게보면 Asset, types, components, utils, const, layout, hooks로 이루어져있으며 src 디렉토리에 위치한 해당 폴더들은 전역에서 사용되는 요소들을 보관하고,
각 피쳐별로 사용되는 요소들은 feature폴더 내부에 각 feature별로 나뉘어 동일한 구조로 보관되어 있습니다.

</details>

<details>
  <summary>global 상수 사용</summary>
![image](https://github.com/jobkaeHenry/cloud-pos-and-shop/assets/100949102/e99988e5-dd9d-494d-beef-eb8c462a68ec)

가독성 / 유지보수성을 개선하기 위해 '자주 사용되는 숫자', '전역적으로 사용되는 값' (로컬스토리지 키) 등을 전역에서 상수로 관리하도록 했습니다.

</details>
