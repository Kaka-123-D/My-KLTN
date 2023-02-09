import { useQuery } from "react-query";
import { apiGetListOrderAvailable } from "core/api/job";
import { USE_GET_LIST_ORDER_AVAILABLE } from "../../constants/queryName";

export function useGetListOrderAvailable(params: any) {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery([USE_GET_LIST_ORDER_AVAILABLE, params], async () => {
    const response = await apiGetListOrderAvailable(params);
    return response;
  });

  return { ...response, error, isLoading };
}
