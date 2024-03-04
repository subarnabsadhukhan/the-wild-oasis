import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const {
    isLoading: isSettingsLoading,
    data: settings,
    error: settingsError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isSettingsLoading, settings, settingsError };
}

export default useSettings;
