import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
  const [searchParmas] = useSearchParams();
  const numdays = !searchParmas.get("last")
    ? 7
    : Number(searchParmas.get("last"));

  const queryDate = subDays(new Date(), numdays).toISOString();

  const { isLoading: isDateLoading, data: bookings } = useQuery({
    queryKey: ["bookings", `last-${numdays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isDateLoading, bookings };
}

export default useRecentBookings;
