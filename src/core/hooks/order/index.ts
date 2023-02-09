import { useQuery } from "react-query";
import { apiGetListOrder, apiGetDetailOrder } from "core/api/order";
import {
  USE_GET_LIST_ORDER,
  USE_GET_DETAIL_ORDER,
} from "../../constants/queryName";

export function useGetListOrder(params: any) {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery([USE_GET_LIST_ORDER, params], async () => {
    const response = await apiGetListOrder(params);
    return response;
  });

  return { ...response, error, isLoading };
}

export function useGetDetailOrder(params: any) {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery(
    [USE_GET_DETAIL_ORDER, params],
    async () => {
      const response = await apiGetDetailOrder(params);
      return response;
    },
    {
      enabled: !!params,
    }
  );

  return { ...response, error, isLoading };
}
