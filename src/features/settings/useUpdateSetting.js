import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";

function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSettingMutate, status: updateSettingStatus } =
    useMutation({
      mutationFn: updateSetting,
      onSuccess: () => {
        toast.success("Setting successfully Upadated");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
      onError: (error) => toast.error(error.message),
    });

  return [updateSettingMutate, updateSettingStatus];
}

export default useUpdateSetting;
