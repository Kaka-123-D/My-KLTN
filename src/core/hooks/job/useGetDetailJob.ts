import { useQuery } from "react-query";
import { apiGetDetailJob } from "core/api/job";
import { USE_GET_DETAIL_JOB } from "../../constants/queryName";

export function useGetDetailJob(params: any) {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery(
    [USE_GET_DETAIL_JOB, params],
    async () => {
      const response = await apiGetDetailJob(params);
      return response;
    },
    {
      enabled: !!params,
    }
  );

  return { ...response, error, isLoading };
}
