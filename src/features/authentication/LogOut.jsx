import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogOut from "./useLogOut";

function LogOut() {
  const { logOutStatus, logoutMutate } = useLogOut();
  function handleLogOut() {
    logoutMutate();
  }
  return (
    <ButtonIcon
      disabled={logOutStatus === "pending" || logOutStatus === "success"}
      onClick={handleLogOut}
    >
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default LogOut;
