import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: loginMutate, status: loginStatus } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);

      toast.success("Login Successful");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { loginMutate, loginStatus };
}

export default useLogin;
