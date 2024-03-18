import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logoutMutate, status: logOutStatus } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("Logout successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    logOutStatus,
    logoutMutate,
  };
}

export default useLogOut;
