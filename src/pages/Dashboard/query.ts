import axios from "axios";
import { useQuery } from "react-query";
import { endPoint } from "../../constant";
import React from "react";

interface GetOnlineVisitorsResponse {
  onlineVisitors: number;
}

type GetWebsitesResponse = {
  domain: string;
  id: string;
}[];

export function useOnlineVisitors(selectedWebsite: string) {
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

export function useWebsitesOptions(
  onSuccess: (
    data: {
      value: string;
      label: string;
    }[],
  ) => void,
) {
  return useQuery({
    queryKey: ["websitesOptions"],
    queryFn: async () =>
      await axios
        .get<GetWebsitesResponse>(endPoint + "/websites")
        .then((res) => {
          return res.data;
        }),
    onSuccess,
    select: React.useCallback(
      (data: GetWebsitesResponse) =>
        data.map((website) => {
          return {
            value: website.id,
            label: website.domain,
          };
        }),
      [],
    ),
  });
}
