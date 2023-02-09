import { useMutation } from "react-query";

import { logout } from "./../../core/api/auth";
import storage from "../../core/helpers/storage";

export function useLogout() {
  const { isLoading, mutateAsync } = useMutation(logout, {
    onSuccess: () => {
      storage.removeToken();
      storage.removeRefreshToken();
    },
  });

  return { isLoggingOut: isLoading, logout: mutateAsync };
}
