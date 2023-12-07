import axios from "axios";
import { useQuery } from "react-query";
import { endPoint } from "../../constant";
import React from "react";
import { dayjs, timeDuration } from "../../utils";

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

export interface Stats {
  uniqueVisitors: number;
  totalVisits: number;
  totalPageViews: number;
  viewsPerVisit: number;
  avgVisitDuration: number;
}

export type SelectedPanel = keyof Stats;

interface UseStatsParams {
  wid: string;
}

export function useStats({ wid }: UseStatsParams) {
  return useQuery({
    queryKey: ["stats", wid],
    queryFn: async () =>
      await axios
        .get<Stats>(endPoint + "/stats?" + new URLSearchParams({ wid }))
        .then((res) => {
          return res.data;
        }),
    select: (data: Stats) => {
      return {
        ...data,
        avgVisitDuration: timeDuration(data.avgVisitDuration),
      };
    },
  });
}

interface UseUniqueVisitorsParams {
  wid: string;
}

type UvResponse = {
  uv: {
    timestamp: number;
    count: number;
  }[];
};

export function useUniqueVisitors({ wid }: UseUniqueVisitorsParams) {
  return useQuery({
    queryKey: ["uv", wid],
    queryFn: async () =>
      await axios
        .get<UvResponse>(endPoint + "/uv?" + new URLSearchParams({ wid }))
        .then((res) => {
          return res.data;
        }),
    select: (data: UvResponse) => {
      const uv = data.uv;
      return uv.map((item) => {
        return {
          count: item.count,
          date: dayjs(item.timestamp).format("YYYY-MM-DD HH:mm"),
        };
      });
    },
  });
}

interface UsePageViewParams {
  wid: string;
}

interface PageViewResponse {
  pv: {
    date: string;
    count: number;
    duration: number;
    sessions: number;
  }[];
}

export function usePageView({ wid }: UsePageViewParams) {
  return useQuery({
    queryKey: ["pageview", wid],
    queryFn: async () =>
      await axios
        .get<PageViewResponse>(endPoint + "/pv?" + new URLSearchParams({ wid }))
        .then((res) => {
          return res.data.pv;
        }),
    // select: (data: PageViewResponse) => {},
  });
}
