import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Fitering
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, operator: "eq" };

  // Sorting
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [sortByField, sortByOrder] = sortByRaw.split("-");
  const sortBy = {
    field: sortByField,
    order: sortByOrder,
  };

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Fetching
  const {
    isLoading: isBookingsLoading,
    data: { data: bookings, count: bookingsCount } = {},
    error: bookingsError,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Pre-fetching
  const totalPages = Math.ceil(bookingsCount / PAGE_SIZE);

  if (page < totalPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isBookingsLoading, bookings, bookingsError, bookingsCount };
}

export default useBookings;
