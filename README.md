# 🛍퍼스널픽 (팀명 : 퍼스널픽)
<!-- ![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=%20Matching%20Service&fontSize=40)-->

## 👀프로젝트 개요 
주제 : 사용자 맞춤형 웹 커머스


## 📅프로젝트 기간
2024.08.19 - 2024.09.12

## 🎲주요기능
<ins>개발 목표</ins>
- 개인화된 맞춤형 화장품 추천 제공 & 맞춤형 샘플 구독 서비스 => 최적의 제품을 쉽게 찾을수 있도록 지원
- 리뷰 긍정 점수 & 주요 키워드 시각화 => 최신 트렌드 제공, 구매 의사 결정
- 직관적, 심미성, 편리한 인터페이스 제공

<ins>개발 내용</ins>

<span style="color:#fff5b1"> 1. 긍정리뷰 순위 </span>
  - 제품의 리뷰를 분석하여 점수를 매기고 순위 출력
    
<span style="color:#fff5b1"> 2. 결제 화면 </span>
  - 토스페이먼트 결제창
  - 결제할 제품 명 및 총 가격 출력

<span style="color:#fff5b1"> 3. 배송지 관리화면 </span>
  - 배송지 여러개를 저장
  - 배송지 수정
  - 배송지 삭제
  - 다음 주소 API 를 사용한 배송지 추가

<span style="color:#fff5b1"> 4. 주요 키워드 제공 화면</span>  
  - 리뷰 와 검색어를 분석한 워드 클라우드 제공
  - 일별 분석 결과를 표시한다

<span style="color:#fff5b1"> 5. 맞춤형 추천 화면</span>  
  - 비구독자와 구독자에 추천 결과 제공
  - 비구독자가 구독 결제시 가림막이 사라짐
  - 비구독자 학습 데이터 3천건, 구독자 학습 데이터 ~

## 🔨기술스택
<table>
  <tr>
    <th>구분</th>
    <th>내용</th>
  </tr>
  <tr>
    <td>Front-End</td>
    <td>
      <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
      <img src="https://img.shields.io/badge/React-F7DF1E?style=for-the-badge&logo=React&logoColor=black"/>
      <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
      <img src="https://img.shields.io/badge/SCSS-1572B6?style=for-the-badge&logo=sass&logoColor=white"/>
      <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"/>   
      <img src="https://img.shields.io/badge/swiper-007396?style=for-the-badge&logo=swiper&logoColor=white"/> 
      <img src="https://img.shields.io/badge/SweetAlert2-EE4353?style=for-the-badge&logoColor=white"/> 
    </td>
    
<img alt="" src="" />
  </tr>
  <tr>
    <td>Back-End</td>
    <td>
      <img src="https://img.shields.io/badge/Flask-6DB33F?style=for-the-badge&logo=flask&logoColor=white"/>
      <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/> 
    </td>
  </tr>
  <tr>
    <td>Library & API</td>
    <td>
        <img src="https://img.shields.io/badge/TossPayment-007CE2?style=for-the-badge&logo=Toss&logoColor=white">
        <img src="https://img.shields.io/badge/Daum 주소 Api-010101?style=for-the-badge&logo=KaKao&logoColor=white"> 
    </td>
  <tr>
    <td>IDE</td>
    <td>
      <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"/> 
    </td>
  </tr>
  <tr>
    <td>Etc.</td>
    <td>
      <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
    </td>
  </tr>
</table>



## ⚙시스템 아키텍처
<p align="center"><img src="https://github.com/user-attachments/assets/5bacfafb-d76b-41d9-b612-ad373d0ec169" height="540px"></p>

***

## ✏서비스 흐름도
<p align="center"><img src="https://github.com/user-attachments/assets/6841d69d-ecb5-4313-adc2-aa8c8126a7d1" weight="450px"></p>

***

## ✏ER-다이어그램
<p align="center"><img src="https://github.com/user-attachments/assets/dd4f9db2-8b2c-4549-8c48-676671bfbc37"></p>

***


## 🎈화면 구성
### 🖱메인
<p align="center"><img src="https://github.com/user-attachments/assets/1224ac83-ed3c-4777-9856-7a450d6e9b4c" width="750px" height="540px"></p>

***

### 🖱검색
<p align="center"><img src="https://github.com/user-attachments/assets/63e76b35-00ba-43dc-b736-d5a1a2a72963" width="750px" height="600px"></p>

***

### 🖱주문/결제
<p align="center"><img src="https://github.com/user-attachments/assets/02f62897-b1a5-409d-bf50-da9762dad760" width="750px" height="600px"></p>

***

### 🖱구독 관리
<p align="center"><img src="https://github.com/user-attachments/assets/6cae815d-653a-4652-b429-a15e1ed0ee58" width="750px" height="600px"></p>

***

### 🖱구독 소개
<p align="center"><img src="https://github.com/user-attachments/assets/a31a307f-9b17-4045-a36e-b73792152238" width="750px" height="600px"></p>

***

### 🖱나의 리뷰
<p align="center"><img src="https://github.com/user-attachments/assets/6aea81dd-6752-4c3c-aec4-c2f61e2f679c" width="750px" height="600px"></p>

***

### 🖱리뷰 작성
<p align="center"><img src="https://github.com/user-attachments/assets/1a7bca31-5347-4c4b-93ff-5a439dd9da7e" width="750px" height="600px"></p>

***

### 🖱리뷰 긍정 점수
<p align="center"><img src="https://github.com/user-attachments/assets/bb05780f-a024-4208-bdd6-2bbcb1284fd0" width="750px" height="600px"></p>

***

### 🖱마이 페이지
<p align="center"><img src="[https://github.com/user-attachments/assets/6cae815d-653a-4652-b429-a15e1ed0ee58](https://github.com/user-attachments/assets/c5e77bda-f91d-470a-a0f9-d694f057aaac)" width="750px" height="600px"></p>

***

### 🖱배송지 추가
<p align="center"><img src="https://github.com/user-attachments/assets/85638ea5-bcad-4192-b128-2c8470db5b9c" width="750px" height="600px"></p>

***

### 🖱상세 페이지
<p align="center"><img src="https://github.com/user-attachments/assets/3a32e176-ad3d-4f48-9c56-7a0369c62464" width="750px" height="600px"></p>

***

### 🖱상세페이지_성분
<p align="center"><img src="https://github.com/user-attachments/assets/88684904-19ee-4701-9c9b-416a5bc7f688" width="750px" height="600px"></p>

***

### 🖱상세페이지_장바구니
<p align="center"><img src="https://github.com/user-attachments/assets/d24df214-4c9c-4693-bdad-ca19a3d3b0a7" width="750px" height="600px"></p>

***

### 🖱주문내역
<p align="center"><img src="https://github.com/user-attachments/assets/d1d03792-cc23-4677-bfb8-4abcade691da" width="750px" height="600px"></p>

***

### 🖱주문 상세
<p align="center"><img src="https://github.com/user-attachments/assets/86f7afb5-e11f-4bf2-993c-facf96f1d037" width="750px" height="600px"></p>

***

### 🖱카테고리 전체 모달창
<p align="center"><img src="https://github.com/user-attachments/assets/7d92e533-e3b7-4e97-9857-8a551b793873" width="750px" height="600px"></p>

***

### 🖱피부 진단기능
<p align="center"><img src="https://github.com/user-attachments/assets/9c367e5f-681e-428f-8501-1423155728df" width="750px" height="600px"></p>

***

### 🖱구독자 화장품 추천
<p align="center"><img src="https://github.com/user-attachments/assets/9716f57d-f337-4344-a695-764eb695eac7" width="750px" height="600px"></p>

***

### 🖱맞춤형 화장품추천
<p align="center"><img src="https://github.com/user-attachments/assets/0e615138-22a3-4bae-847e-cf653ba41fff" width="750px" height="600px"></p>

***


## 💗팀원 역할





  <table style="width=1000px;" >
    <tr >
      <td><img src="https://github.com/user-attachments/assets/0145b28a-24ab-4a18-b1cf-166161ae1247" width="200px" height="200px"></td>
      <td><img src="https://github.com/user-attachments/assets/c679a169-df8d-494c-a2be-b40af4f02661" width="200px" height="200px"></td>
      <td><img src="https://github.com/user-attachments/assets/06395d1d-a548-4ced-8137-89de9fc8f98d" width="200px" height="200px"></td>
      <td><img src="https://github.com/user-attachments/assets/2e83ded0-7463-4d06-97a4-379a122a237e" width="200px" height="200px"></td>
      <td><img src="https://github.com/user-attachments/assets/b6664676-38a4-4c9f-a0ae-707a1dea192a" width="200px" height="200px"></td>
    </tr>
    <tr >
      <td ><center>최지원</center></td>
      <td>김도연</td>
      <td>이상현</td>
      <td>정승진</td>
      <td>오세원</td>
    </tr>
    <tr >
      <td>Main</td>
      <td>Main</td>
      <td>Main</td>
      <td>Main</td>
      <td>Main</td>
    </tr>
    <tr >
      <td>팀장, Back-End</td>
      <td>Back-End</td>
      <td>Front-End</td>
      <td>Front-End</td>
      <td>Front-End</td>
    </tr>
    <tr  >
      <td >
        - 전체 일정 관리 및 기획<br>
        - 산출문서 제작<br>
        - Back-end 서버 구축<br>
        - 홈 화면<br>
        - 상세 화면<br>
        - 장바구니 화면<br>
        - 주문 화면<br>
        - 배송지 화면<br>
        - 검색 화면 등 화면 관련 서버 구축<br>
        - DB<br>
          - 테이블 생성 및 전처리<br>
        - front-end<br>
          - 로고, 푸터 제작<br>
          - 랭킹 컴포넌트 구현<br>
        - 인공지능<br>
          - 텍스트 마이닝 (리뷰 긍정 점수 랭킹) 
      </td>
      <td >
        - BackEnd 서버 구축<br>
        - Selenium, BeautifulSoup 크롤링 데이터 23만개 수집 / 가공<br>
        - 피부타입 진단 기능<br>
        - 화장품 추천 기능<br>
          - knn, cosine, 행렬분해 모델을 이용해 협업 필터링 추천<br>
          - 성분 기반 간단한 추천 구현<br>
        - 장바구니 추천 기능<br>
          - 비슷한 성분의 제품 추천<br>
        - 마이페이지/로그인 관련 페이지 구현<br>
          - session, redux에 로그인 정보 유지
      </td>
      <td >
        - 프론트엔드 총괄<br>
        - sweet-alert2 라이브러리 사용<br>
        - 다음 주소 api 연동<br>
        - 토스 페이먼트 api 연동<br>
        - 서버 통신 시간 개선 (10m -> 1s)<br>
        - redux 구현<br>
        - 워드 클라우드 추출<br>
        - 메인화면 구현<br>
        - 2중 카테고리 구현<br>
        - 제품 전체보기 구현<br>
        - 장바구니 구현<br>
        - 주문내역 구현<br>
        - 주문/결제 구현<br>
        - 정기 구독관리 구현<br>
        - 리뷰작성
      </td>
      <td>
        - 프론트엔드<br>
        - 리액트 Framer-Motion , Count Up 라이브러리 사용<br>
        - sweet-alert2 사용<br>
        - 상세페이지 구현(리뷰 , 성분 , 별점 , 장바구니 기능)<br>
        - 회원 맞춤 추천 화장품 화면 구현<br>
        - 구독 소개 화면 구현
      </td>
      <td>
        - 
      </td>
    </tr>
    <tr>
      <td>Sub</td>
      <td>Sub</td>
      <td>Sub</td>
      <td>Sub</td>
      <td>Sub</td>
    </tr>    
  </table>

***
<!--
## 🚨트러블슈팅
<h4>1번 문제</h4>

![Frame 3](https://github.com/2024-SMHRD-SW-DataDesign-1/AnimalLove/assets/167040672/3123dbd8-17f3-4d48-aa92-81a7d2e3df25) <br>
![Frame 4](https://github.com/2024-SMHRD-SW-DataDesign-1/AnimalLove/assets/167040672/355b8d19-5493-4c86-b342-17165cd3f862)
<p>• 1번 오류 : 세션을 가져와 중복확인 조건 사용 시 기존 정보를 사용하지 못하는 오류 발생</p>
<p>• 2번 해결방안 : ChkResult 조건을 로그인 세션에서 가져온 정보와 같을 때도 정보 수정이 가능하도록 조건을 변경하여 해결</p>

***

<h4>2번 문제</h4>

![Frame 5](https://github.com/2024-SMHRD-SW-DataDesign-1/AnimalLove/assets/167040672/659bba96-b032-4d0b-82e1-a9c811db7bcf)
![image](https://github.com/2024-SMHRD-SW-DataDesign-1/AnimalLove/assets/109319988/7e4713c1-33a8-41fb-97ab-3f8a19d33445)
<p>• 오류 : 채팅이 들어왔을 때 알림이 실시간으로 갱신이 되지 않는 오류 </p>
<p>• 해결방안 : 채팅 리스트가 생성될 때 소켓을 한번 더 열어줌 으로써 오류 해결</p>
-->
# pp_er
