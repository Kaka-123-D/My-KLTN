import { useQuery } from "react-query";
import { apiGetListCandidateAvailable } from "core/api/job";
import { USE_GET_LIST_CANDIDATE_AVAILABLE } from "../../constants/queryName";

export function useGetListCandidateAvailable(params: any) {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery([USE_GET_LIST_CANDIDATE_AVAILABLE, params], async () => {
    const response = await apiGetListCandidateAvailable(params);
    return response;
  });

  return { ...response, error, isLoading };
}
