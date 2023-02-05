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
   - 코드의 가독성이 좋을 수 있도록 DRY(Don't Repeat Yourselft)에 신경쓰고 관심사를 계속 분리하려 했습니다.  

2. 작업 방식
   - git flow 와 비슷하게 feature 브랜치로 분기후 feature에서 기능별로 브랜치를 분기하였습니다.
   - 구현 후 PR을 보내 merge 하는 방식으로 진행하려 노력했습니다.


## 구현 요구사항 목록

### List


- [x] It should be a search result list.
- [x] After page refresh, the search result should persist.
- [x] The column is in order of [상품번호, 상품명, 브랜드, 상품내용, 가격, 평점, 재고].
- [x] Display the total amount of data at the top of the list.
- [x] The maximum length of [상품내용] is 40 characters. If it exceeds the maximum length, you should display the rest of the content using ellipsis ....


List 및 Pagination 시연 영상

![list-part](https://user-images.githubusercontent.com/79836148/216230784-07184d76-ed02-4add-a464-9bc91f068936.gif)


 ### Search


- [x] Search conditions are the following : [전체, 상품명, 브랜드, 상품내용].
- [x] Both search condition and keyword must be persisted after the refresh.


Search 시연 영상

![search-part](https://user-images.githubusercontent.com/79836148/216230884-9b4e3289-ab10-4d35-8926-5cd71cf45aa3.gif)


 ### Pagination


- [x] Implement rows per page using a select box. The select box should display [10, 20, 50] options.
- [x] Both rows per page and page number must be persisted after the refresh.


## 구현 고려사항


### List

* 페이지 당 행에 따른 리스트의 길이가 길어져 전체 화면이 길어지는 부분

  - overflow-y : auto; 를 주어서 리스트 화면안에서 스크롤되게 구현하였습니다.
  
* 40글자가 넘어가면 ellipsis 효과를 주는 부분  ( 이슈 Using ellipsis question #2 )

  - text-overflow : ellipsis 는 width가 정해져야 설정이 적용되는 것으로 알고 있습니다. 그래서 받아온 **상품내용** 의 글자 길이를 기반으로 동적으로 width를 정해주려 했으나 
    재 설정된 width는 실제 40글자의 width라 원하는대로 적용되지 않았습니다. 그래서 **상품내용**에 width를 %로 설정하고 40글자가 넘어가는 상품내용은 slice로 잘라서 보여주는 것으로 했습니다.  

### 검색 기록 유지

*  redux-persist 와 localStorage 를 사용하지 않고 data기록을 유지하는 부분
   - 현재 페이지 번호, 페이지 당 행 값, 검색 카테고리 그리고 검색어 를 url의 search params로 넣어서 유지할 수 있도록 했습니다. 
    Search params에 값을 넣는 부분이 여러 컴포넌트에 걸쳐있어서 따로 커스텀 훅을 만들어 관리했습니다.


## 개선 사항

- 

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
