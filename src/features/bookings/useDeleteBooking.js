import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { status: deleteStatus, mutate: deleteBookingMutate } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },

    networkMode: "always",
  });

  return [deleteBookingMutate, deleteStatus];
}

export default useDeleteBooking;
