import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, status: userStatus } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {
    user,
    userStatus,
  };
}
