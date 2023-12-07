import * as React from "react";
import { Chart } from "./Chart";
import { Referrers } from "./Referrer";
import { Pages } from "./Pages";
import { Card } from "../../Components/Card";
import { Country } from "./Contry";
import { Loading } from "../../Components/Loading";
import { WebsitesSelect } from "./components/WebsitesSelect";
import { useOnlineVisitors, useWebsitesOptions } from "./query";
import { createContext } from "@cyhfe/react-ui";

interface DashboardContextValue {
  wid?: string;
}

const [DashboardProvider, useDashboard] =
  createContext<DashboardContextValue>("Dashboard");

function Dashboard() {
  const [selectedWebsite, setSelectedWebsite] = React.useState<string>();

  const { data: options, isLoading: isGetWebsitesLoading } = useWebsitesOptions(
    (data) => setSelectedWebsite(data[0].value),
  );

  const { data: onlineVisitors, isLoading: isOnlineVisitorsLoading } =
    useOnlineVisitors(selectedWebsite ?? "");

  return (
    <DashboardProvider wid={selectedWebsite}>
      <div className="dashboard flex flex-col gap-y-2">
        {isGetWebsitesLoading && <Loading />}

        <div className="flex gap-x-4">
          {options && (
            <WebsitesSelect
              options={options}
              placeholder="select a website"
              onSelectedChange={(v) => setSelectedWebsite(v as string)}
              selectedValue={selectedWebsite}
            />
          )}
          <div className="flex items-center gap-x-3">
            <OnlineIcon />
            <span>
              在线:
              <span className="font-medium">
                {isOnlineVisitorsLoading && <Loading />}
                {onlineVisitors && onlineVisitors}
              </span>
            </span>
          </div>
        </div>

        {selectedWebsite && (
          <>
            <Chart />

            <div className="flex gap-x-6">
              <Card className="basis-1/2 p-4">
                <Pages />
              </Card>
              <Card className="basis-1/2 p-4">
                <Referrers />
              </Card>
            </div>
            <div className="flex gap-x-6">
              <Card className="basis-1/2 p-4">
                <Country />
              </Card>
              <Card className="basis-1/2 p-4">
                <Referrers />
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardProvider>
  );
}

function OnlineIcon() {
  return (
    <span className="relative flex h-3 w-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
    </span>
  );
}

export { Dashboard, useDashboard };
