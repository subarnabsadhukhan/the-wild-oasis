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

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading: isBookingsLoading,
    data: { data: bookings, count: bookingsCount } = {},
    error: bookingsError,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isBookingsLoading, bookings, bookingsError, bookingsCount };
}

export default useBookings;
