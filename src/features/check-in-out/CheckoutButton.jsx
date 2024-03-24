import Button from "../../ui/Button";
import useCheckOut from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOutMutate, checkOutStatus } = useCheckOut();
  return (
    <Button
      disabled={checkOutStatus === "pending" || checkOutStatus === "success"}
      onClick={() => checkOutMutate(bookingId)}
      $variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
