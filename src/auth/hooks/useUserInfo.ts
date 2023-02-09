import { useQuery } from "react-query";
import { apiGetUserInfo } from "../../core/api/auth";
import { USER_INFO } from "../../core/constants/queryName";
import storage from "../../core/helpers/storage";

export function useUserInfo() {
  const { data: response, isLoading } = useQuery([USER_INFO], () => apiGetUserInfo(), {
    enabled: !!storage.getToken(),
  });
  return { data: response?.data, isLoading };
}
