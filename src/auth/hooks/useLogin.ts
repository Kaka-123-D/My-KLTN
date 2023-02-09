import { useMutation } from "react-query";

import { apiLogin } from "../../core/api/auth";
import { TokenType } from "../../core/constants/enums";
import storage from "../../core/helpers/storage";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> => {
  const { data } = await apiLogin({ email, password });
  storage.setToken(data?.token);
  storage.setRefreshToken(data?.refreshToken);
  return data;
};

export function useLogin() {
  const { isLoading, mutateAsync } = useMutation(login);

  return { isLoggingIn: isLoading, login: mutateAsync };
}
