import { api } from "@utils/api";

interface IUser {
  access_token: string;
}

const logInService = async (email: string, password: string) => {
  const res = await api.post<IUser>(
    "/auth/signin",
    JSON.stringify({ email, password })
  );
  return res;
};

const signUpService = async (email: string, password: string) => {
  const res = await api.post<IUser>(
    "/auth/signup",
    JSON.stringify({ email, password })
  );
  return res;
};

const AuthService = {
  logInService,
  signUpService,
};

export default AuthService;
