import * as React from "react";
import { Referrers } from "./Referrer";
import { Pages } from "./Pages";
import { Card } from "../../Components/Card";
import { Country } from "./Contry";
import { WebsitesSelect } from "./components/WebsitesSelect";
import { useOnlineVisitors, useWebsitesOptions } from "./query";
import { createContext } from "@cyhfe/react-ui";
import { MainPanel } from "./MainPanel";
import { OnlineIcon } from "./components/OnlineIcon";
import { Device } from "./Device";
import { Loading } from "../../Components/Loading";

interface DashboardContextValue {
  wid: string;
}

const [DashboardProvider, useDashboard] =
  createContext<DashboardContextValue>("Dashboard");

function Dashboard() {
  const [selectedWebsite, setSelectedWebsite] = React.useState<string>();

  const { data: options, isLoading } = useWebsitesOptions((data) =>
    setSelectedWebsite(data[0].value),
  );

  const { data: onlineVisitors } = useOnlineVisitors(selectedWebsite ?? "");

  if (isLoading) return <Loading />;
  if (!selectedWebsite) return <div>missing wid</div>;

  return (
    <DashboardProvider wid={selectedWebsite}>
      <div className="dashboard flex flex-col gap-y-6">
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
                {onlineVisitors && onlineVisitors}
              </span>
            </span>
          </div>
        </div>

        <MainPanel />

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
            <Device />
          </Card>
        </div>
      </div>
    </DashboardProvider>
  );
}

export { Dashboard, useDashboard };
