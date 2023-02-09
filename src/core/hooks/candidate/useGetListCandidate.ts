import { useQuery } from "react-query";
import { apiGetListCandidate } from "../../api/candidate";
import { USE_GET_LIST_CANDIDATE } from "../../constants/queryName";

export function useGetListCandidate(params: any) {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery([USE_GET_LIST_CANDIDATE, params], async () => {
    const response = await apiGetListCandidate(params);
    return response;
  });

  return { ...response, error, isLoading };
}
