import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabin() {
  const {
    isLoading: isCabinsLoading,
    data: cabins,
    error: cabinsError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isCabinsLoading, cabins, cabinsError };
}

export default useCabin;
