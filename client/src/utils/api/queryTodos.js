import { doFetch, railsAPI } from '@utils/api/apiController.js';
import { useQuery } from 'react-query';

const queryTodos = () =>
  doFetch(`${railsAPI}/api/v1/todos`).then((data) => data);

// Staletime is in milliseconds
export const useFetchTodos = () =>
  useQuery({
    retry: 0,
    queryKey: 'useGetAllTodos',
    queryFn: queryTodos,
    staleTime: 1000 * 60 * 3,
  });
