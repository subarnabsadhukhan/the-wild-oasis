import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkInMutate, status: checkInStatus } = useMutation({
    mutationFn: ({ bookingId, addBreakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...addBreakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkInMutate, checkInStatus };
}

export default useCheckIn;
