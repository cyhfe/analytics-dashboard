import axios from "axios";
import { useQuery } from "react-query";
import { endPoint } from "../../constant";

interface GetOnlineVisitorsResponse {
  onlineVisitors: number;
}

export function useWebsitesOptions(selectedWebsite: string) {
  return useQuery({
    queryKey: ["onlineVisitors", selectedWebsite],
    queryFn: async () =>
      await axios
        .get<GetOnlineVisitorsResponse>(
          endPoint + "/online?" + new URLSearchParams({ wid: selectedWebsite }),
        )
        .then((res) => {
          return res.data.onlineVisitors;
        }),
    enabled: !!selectedWebsite,
  });
}
