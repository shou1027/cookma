import { Recipes } from '@/types/Recipe';
import useSWR from 'swr';

export const useAllRecipesSWR = () => {
  const fetcher = async (url: string): Promise<any> => {
    const resonse = await fetch(url);
    return resonse.json();
  };

  const { data, error } = useSWR<Recipes[]>('/api/v1/recipes', fetcher, {
    suspense: true,
  });
  return { data, error };
};
