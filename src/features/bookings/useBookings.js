import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

function useBookings() {
  const {
    isLoading: isBookingsLoading,
    data: bookings,
    error: bookingsError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isBookingsLoading, bookings, bookingsError };
}

export default useBookings;
