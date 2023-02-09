import { useQuery } from "react-query";
import { apiGetListJob } from "core/api/job";
import { USE_GET_LIST_JOB } from "../../constants/queryName";

export function useGetListJob(params: any) {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery([USE_GET_LIST_JOB, params], async () => {
    const response = await apiGetListJob(params);
    return response;
  });

  return { ...response, error, isLoading };
}