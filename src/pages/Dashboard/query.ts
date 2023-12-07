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

export type Filter = "day" | "week" | "month" | "year" | "alltime";

interface UseStatsParams {
  wid: string;
  filter: Filter;
}

export function useStats({ wid, filter }: UseStatsParams) {
  return useQuery({
    queryKey: ["stats", wid, filter],
    queryFn: async () =>
      await axios
        .get<Stats>(endPoint + "/stats?" + new URLSearchParams({ wid, filter }))
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
  filter: Filter;
}

type UvResponse = {
  uv: {
    timestamp: number;
    count: number;
  }[];
};

export function useUniqueVisitors({ wid, filter }: UseUniqueVisitorsParams) {
  return useQuery({
    queryKey: ["uv", wid, filter],
    queryFn: async () =>
      await axios
        .get<UvResponse>(
          endPoint + "/uv?" + new URLSearchParams({ wid, filter }),
        )
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
  filter: Filter;
}

interface PageViewResponse {
  pv: {
    date: string;
    count: number;
    duration: number;
    sessions: number;
  }[];
}

export function usePageView({ wid, filter }: UsePageViewParams) {
  return useQuery({
    queryKey: ["pageview", wid, filter],
    queryFn: async () =>
      await axios
        .get<PageViewResponse>(
          endPoint + "/pv?" + new URLSearchParams({ wid, filter }),
        )
        .then((res) => {
          return res.data.pv;
        }),
  });
}

interface Page {
  pathname: string;
  duration: number;
  count: number;
  sessions: number;
}

type PageResponse = {
  pages: Page[];
};

interface UsePageParams {
  wid: string;
}

export function usePages({ wid }: UsePageParams) {
  return useQuery({
    queryKey: ["pages", wid],
    queryFn: async () =>
      await axios
        .get<PageResponse>(endPoint + "/pages?" + new URLSearchParams({ wid }))
        .then((res) => {
          return res.data.pages;
        }),
  });
}

interface Referrer {
  referrer: string;
  duration: number;
  count: number;
  sessions: number;
}

type ReferrerResponse = {
  referrers: Referrer[];
};

interface UseReferrersParams {
  wid: string;
}

export function useReferrers({ wid }: UseReferrersParams) {
  return useQuery({
    queryKey: ["referrers", wid],
    queryFn: async () =>
      await axios
        .get<ReferrerResponse>(
          endPoint + "/referrers?" + new URLSearchParams({ wid }),
        )
        .then((res) => {
          return res.data.referrers;
        }),
  });
}

interface Country {
  country: string;
  duration: number;
  count: number;
  sessions: number;
}
type CountryResponse = {
  countries: Country[];
};

interface UseCountryParams {
  wid: string;
}

export function useCountries({ wid }: UseCountryParams) {
  return useQuery({
    queryKey: ["countries", wid],
    queryFn: async () =>
      await axios
        .get<CountryResponse>(
          endPoint + "/countries?" + new URLSearchParams({ wid }),
        )
        .then((res) => {
          return res.data.countries;
        }),
  });
}

type DeviceInfo = {
  name: string;
  count: number;
};

export interface Devices {
  browser: DeviceInfo[];
  device: DeviceInfo[];
  os: DeviceInfo[];
}

interface UseDevicesParams {
  wid: string;
}

export function useDevices({ wid }: UseDevicesParams) {
  return useQuery({
    queryKey: ["devices", wid],
    queryFn: async () =>
      await axios
        .get<Devices>(endPoint + "/devices?" + new URLSearchParams({ wid }))
        .then((res) => {
          return res.data;
        }),
  });
}
