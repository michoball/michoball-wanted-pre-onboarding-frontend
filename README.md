#  wanted-pre-onboarding-frontend 과제 제출 

<p>
<img alt="Typescript" src="https://img.shields.io/badge/Typescript-v4.9.4-3178C6?style=plastic&logoColor=white%22/%3E"/>
<img alt="React" src="https://img.shields.io/badge/React-v18.2.0-61DAFB?style=plastic&logo=react&logoColor=white"/>
<img alt="React Router" src="https://img.shields.io/badge/React Router-v6.8.0-CA4245?style=plastic&logo=reactrouter&logoColor=white"/>
<img alt="Styled Component" src="https://img.shields.io/badge/Styled Component-v5.3.6-DB7093?style=plastic&logo=styledcomponents&logoColor=white"/>
</p>


## 실행 방법

```sh
git clone // this repository
cd this file location
npm install 
npm start 
# front : http://localhost:3000 
```

[배포 사이트](https://michoball.github.io/wanted-pre-onboarding-frontend)


## 목록

- [과제 진행 시 주안점](#과제진행-시-주안점)<br/>
- [구현 요구사항 목록](#구현-요구사항-목록)<br/>
- [개선 사항](#개선-사항)<br/>
- [SRC 폴더 구조](#폴더-구조)<br/>
- [인적사항](#인적사항)<br/>



## 과제진행 시 주안점 


1. 가독성
   - 코드의 가독성이 좋을 수 있도록 DRY(Don't Repeat Yourself)에 신경쓰고 관심사를 계속 분리하려 했습니다.  

2. 작업 방식
   - git flow 와 비슷하게 feature 브랜치로 분기후 feature에서 기능별로 브랜치를 분기하였습니다.
   - 구현 후 PR을 보내 merge 하는 방식으로 진행하려 노력했습니다.


## 구현 요구사항 목록

### Sign in & up

- [x] 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요 (이메일 조건: @ 포함, 비밀번호 조건: 8자 이상)
   - [x] 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여해주세요
   - [x] 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 /signin 경로로 이동해주세요
- [x] 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 /todo 경로로 이동해주세요
- [x] 응답받은 JWT는 로컬 스토리지에 저장해주세요
- [x] 로그인 여부에 따른 리다이렉트 처리를 구현해주세요


 ### Todo List


- [x] /todo경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
   - [x] 목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.
   - [x] TODO의 완료 여부는 <input type="checkbox" />를 통해 표현해주세요
   - [x] TODO는 `<li> tag` 를 이용해 감싸주세요.
- [x] 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button을 만들어주세요
   - [x] 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요
- [x] TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.
- [x] TODO 우측에 수정버튼과 삭제 버튼을 만들어주세요
- [x] 투두 리스트의 삭제 기능을 구현해주세요
- [x] 투두 리스트의 수정 기능을 구현해주세요


## 구현 고려사항


* Axios interceptor를 이용한 api request response 셋팅

  - utils 폴더에 api.config.ts 파일을 생성하여 axios의 기본 셋팅을 구현하여 반복되는 코드를 줄였습니다.
  
* 로그인 여부에 따른 리다이렉트 처리

  - /todo 로의 접근은 Private Route를 생성하여 접근을 막았습니다. 
  - /signin 과 /signup 은 라우트로 들어왔을 때 token의 여부를 체크하여 "/" 로 리다이렉트 하도록 했습니다.



## 개선 사항

- sign in과 sign up 에 reducer로 구현한 login validator 기능을 커스텀 훅으로 빼서 다루는 것이 가독성에 더 좋아보여 개선이 필요해보입니다 .

- 로그인후 sign in 과 sign up route 에 접근 시 잠깐 접속되었다가 리다이렉트되는 현재 구현 상태가 UX에 좋지 않아 개선이 필요해보입니다.

## 폴더 구조

```
📦src
 ┣ 📂api
 ┃ ┣ 📜authService.ts
 ┃ ┗ 📜todoService.ts
 ┣ 📂components
 ┃ ┣ 📜PrivateRoute.jsx
 ┃ ┣ 📜SignInForm.tsx
 ┃ ┣ 📜SignUpForm.tsx
 ┃ ┣ 📜TodoCard.tsx
 ┃ ┣ 📜TodoForm.tsx
 ┃ ┗ 📜TodoList.tsx
 ┣ 📂context
 ┃ ┣ 📜authContext.tsx
 ┃ ┗ 📜todoContext.tsx
 ┣ 📂pages
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜Navigation.tsx
 ┃ ┣ 📜SignIn.tsx
 ┃ ┣ 📜SignUp.tsx
 ┃ ┗ 📜Todo.tsx
 ┣ 📂styles
 ┃ ┣ 📂button
 ┃ ┃ ┣ 📜AppButton.styles.tsx
 ┃ ┃ ┗ 📜AppButton.tsx
 ┃ ┣ 📂spinner
 ┃ ┃ ┣ 📜Spinner.styles.tsx
 ┃ ┃ ┗ 📜Spinner.tsx
 ┃ ┣ 📜FormInput.module.css
 ┃ ┗ 📜FormInput.tsx
 ┣ 📂utils
 ┃ ┣ 📜api.ts
 ┃ ┗ 📜localStorage.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
```

## 인적사항


이름 – 강명훈 

이메일 – myunghun0114@gmail.com
