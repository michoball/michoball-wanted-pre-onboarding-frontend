# wanted-pre-onboarding-frontend 과제 제출

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

- [개선 사항](#개선-사항)<br/>
- [구현 요구사항 목록](#구현-요구사항-목록)<br/>

</br>

# 코드 특징

## useReducer를 이용한 Sign-in form Validator

</br>

validator 구현을 useReducer를 사용하여 구현하였습니다. </br>

email과 password에 대한 validator 코드 snippet입니다.

```typescript
export interface State {
  value: string;
  isValid: boolean | null;
}

export interface ActionType {
  type: string;
  val?: string;
}

export const emailReducer = (state: State, action: ActionType): State => {
  if (action.type === "USER_INPUT") {
    if (action.val)
      return {
        value: action.val,
        isValid: action.val.includes("@"),
      };
  }
  return { value: "", isValid: null };
};
```

코드 내에서는 다음과 같이 쓰였습니다. (email 부분만)

```typescript
const SignInForm = () => {
  // email , password등 validator를 통과했는지 여부
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const { value: email, isValid: emailIsValid } = emailState;

  // email input에 입력시 0.3초 마다 vliadation check
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(!!emailIsValid);
    }, 300);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // 로그인
  };

  // email input onChange handler에 email action dispatch
  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

  return (
    <>
      <AuthForm onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          data-testid="email-input"
          value={email}
          required
          isValid={emailIsValid}
          onChange={emailChangeHandler}
        />
      </AuthForm>
    </>
  );
};
```

## 로그인 여부에 따른 Redirect 처리

PrivateRoute 컴포넌트를 만들어서 localStorage에 token이 있으면 Todo 페이지로 가고 없으면 /signin으로 가도록 구현했습니다.

```typescript
const PrivateRoute = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const { setUserToken } = useContext(TodoContext);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // localStorage에 token있는지 가져오기
      const userToken = StorageControl.storageGetter("token");
      if (!userToken) {
        setLoggedIn(false);
        return;
      }
      setUserToken(userToken);
    }
    return () => {
      isMounted = false;
    };
  }, [setUserToken]);

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
```

Sign in 과 Sign up 컴포넌트 내에 useEffect로 token이 있을 시 todo 컴포넌트로 가도록 했습니다.

```typescript
const SignIn = () => {
  const navigate = useNavigate();
  // AuthContext 내에서 token있는지 여부로 isLoggedIn 상태 부여
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    // token이 있다면 /todo로 redirect
    if (isLoggedIn) navigate("/todo");
  }, [isLoggedIn, navigate]);

  return (
    <SignInSection>
      <header>
        <h2>Sign - In</h2>
      </header>
      <SignInForm />
    </SignInSection>
  );
};
export default SignIn;
```

## 개선 사항

- SignIn과 SignUp에 reducer로 구현한 login validator기능을 커스텀 훅으로 빼서 다루는 것이 가독성에 더 좋아보입니다 .

- 로그인후 SignIn 과 SignUp route에 접근 시 잠깐 접속되었다가 Redirect되는 현재 구현 상태가 UX에 좋지 않아 개선이 필요해보입니다.

- 세부 라우트로 직접 접근시 페이지 에러(404에러)가 나오는 오류가 있습니다.

- error 핸들링을 하는 부분을 개선하면 좋을 것 같습니다.

</br>
</br>

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

- Axios interceptor를 이용한 api request response 셋팅

  - utils 폴더에 api.config.ts 파일을 생성하여 axios의 기본 셋팅을 구현하여 반복되는 코드를 줄였습니다.

- 로그인 여부에 따른 리다이렉트 처리

  - /todo 로의 접근은 Private Route를 생성하여 접근을 막았습니다.
  - /signin 과 /signup 은 라우트로 들어왔을 때 token의 여부를 체크하여 "/" 로 리다이렉트 하도록 했습니다.

# wanted-pre-onboarding-frontend 과제 제출

<p>
<img alt="Typescript" src="https://img.shields.io/badge/Typescript-v4.9.4-3178C6?style=plastic&logoColor=white%22/%3E"/>
<img alt="React" src="https://img.shields.io/badge/React-v18.2.0-61DAFB?style=plastic&logo=react&logoColor=white"/>
<img alt="React Router" src="https://img.shields.io/badge/React Router-v6.8.0-CA4245?style=plastic&logo=reactrouter&logoColor=white"/>
</p>

## 실행 방법

```sh
git clone // this repository
cd this file location
npm install
npm start
# front : http://localhost:3000
```

배포 사이트 (https://만들예정)

## 👨‍💻 팀원

| [강명훈](https://github.com/michoball) | [김진영](https://github.com/tbs01215)  |  [백유리](https://github.com/BaekYuri)  | [김유신](https://github.com/kysclient) |
| :------------------------------------: | :------------------------------------: | :-------------------------------------: | :------------------------------------: |
| [최명식](https://github.com/mysungsik) | [안윤경](https://github.com/skyhanull) | [구본아](https://github.com/bona373737) | [김재욱](https://github.com/WooGie911) |
