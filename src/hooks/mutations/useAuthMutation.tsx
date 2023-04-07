import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "@api/authService";
import { StorageControl } from "@utils/localStorage";

const useAuthMutation = () => {
  const navigate = useNavigate();

  const useLoginMutate = (email: string) => {
    return useMutation({
      mutationKey: ["signin"],
      mutationFn: ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        return AuthService.logInService(email, password);
      },
      onSuccess: (user) => {
        const { access_token: token } = user.data;
        StorageControl.storageSetter(email, token);
        navigate("/todo");
      },
    });
  };

  const useSignUpMutate = () => {
    return useMutation({
      mutationKey: ["signup"],
      mutationFn: ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        return AuthService.signUpService(email, password);
      },
      onSuccess: () => {
        navigate("/signin");
      },
    });
  };

  return { useLoginMutate, useSignUpMutate };
};

export default useAuthMutation;
