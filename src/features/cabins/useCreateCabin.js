import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabinMutate, status: createCabinStatus } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //   reset();
    },
    onError: (error) => toast.error(error.message),
  });

  return [createCabinMutate, createCabinStatus];
}

export default useCreateCabin;
