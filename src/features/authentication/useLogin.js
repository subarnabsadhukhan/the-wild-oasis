import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: loginMutate, status: loginStatus } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Login Successful");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { loginMutate, loginStatus };
}

export default useLogin;
