import toast from "react-hot-toast";
import { editCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabinMutate, status: editCabinStatus } = useMutation({
    mutationFn: editCabin,
    onSuccess: () => {
      toast.success("Cabin successfully Upadated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return [editCabinMutate, editCabinStatus];
}

export default useEditCabin;
