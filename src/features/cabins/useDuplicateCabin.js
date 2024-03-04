import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { duplicateCabin } from "../../services/apiCabins";

function useDuplicateCabin() {
  const queryClient = useQueryClient();
  const { mutate: duplicateCabinMutate, status: duplicateCabinStatus } =
    useMutation({
      mutationFn: duplicateCabin,
      onSuccess: () => {
        toast.success("Cabin successfully duplicated");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      },
      onError: (error) => toast.error(error.message),
    });

  return [duplicateCabinMutate, duplicateCabinStatus];
}

export default useDuplicateCabin;
