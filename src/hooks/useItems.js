import { getItems } from "@/server/api";
import { useQuery } from "@tanstack/react-query";

export function useItems() {
  const {
    data: blocks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });
  return { blocks, isLoading, error };
}
