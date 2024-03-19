import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUp() {
  const { mutate: signUpMutate, status: signUpStatus } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success(
        `Account successfully Created! Please verify the new account from the user's email address.`
      );
    },

    onError: (error) => toast.error(error.message),
  });

  return { signUpMutate, signUpStatus };
}


export default useSignUp;

