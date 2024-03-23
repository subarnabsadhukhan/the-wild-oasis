import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParmas] = useSearchParams();
  const numdays = !searchParmas.get("last")
    ? 7
    : Number(searchParmas.get("last"));

  const queryDate = subDays(new Date(), numdays).toISOString();

  const { isLoading: isStaysLoading, data: stays } = useQuery({
    queryKey: ["stays", `last-${numdays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isStaysLoading, stays, confirmedStays, numdays };
}

export default useRecentStays;
