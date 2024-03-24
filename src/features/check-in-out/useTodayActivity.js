import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const {
    isLoading: isTodayActivityLoading,
    data: todayActivity,
    error: todayActivityError,
  } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { isTodayActivityLoading, todayActivity, todayActivityError };
}

export default useTodayActivity;
