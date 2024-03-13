import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, operator: "eq" };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [sortByField, sortByOrder] = sortByRaw.split("-");
  const sortBy = {
    field: sortByField,
    order: sortByOrder,
  };

  const {
    isLoading: isBookingsLoading,
    data: bookings,
    error: bookingsError,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isBookingsLoading, bookings, bookingsError };
}

export default useBookings;
