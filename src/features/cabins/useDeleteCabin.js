import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { status: deleteStatus, mutate: deleteCabinMutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },

    networkMode: "always",
  });

  return [deleteCabinMutate, deleteStatus];
}

export default useDeleteCabin;
