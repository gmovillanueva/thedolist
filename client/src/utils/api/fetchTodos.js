import { doFetch, railsAPI } from '@utils/api/apiController.js';
import { useQuery } from 'react-query';

const fetchTodos = () =>
  doFetch(`${railsAPI}/api/v1/todos`).then((data) => data);

// Staletime is in milliseconds
export const useFetchTodos = () =>
  useQuery({
    retry: 0,
    queryKey: 'useGetAllTodos',
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 3,
  });
