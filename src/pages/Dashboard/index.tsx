import { endPoint } from "../../constant";
import * as React from "react";
import { Chart } from "./Chart";
import { Referrers } from "./Referrer";
import { Pages } from "./Pages";
import { Card } from "../../Components/Card";
import { Country } from "./Contry";
import { useQuery } from "react-query";
import axios from "axios";
import { Loading } from "../../Components/Loading";
import { WebsitesSelect } from "./components/WebsitesSelect";
import { useWebsitesOptions } from "./query";

interface Websites {
  domain: string;
  id: string;
}

function Dashboard() {
  const [selectedWebsite, setSelectedWebsite] = React.useState<string>();
  const { data: options, isLoading: isGetWebsitesLoading } = useQuery({
    queryKey: ["options"],
    queryFn: async () =>
      await axios.get<Websites[]>(endPoint + "/websites").then((res) => {
        return res.data;
      }),
    onSuccess: (data) => {
      setSelectedWebsite(data[0].value);
    },
    select: React.useCallback(
      (data: Websites[]) =>
        data.map((website) => {
          return {
            value: website.id,
            label: website.domain,
          };
        }),
      [],
    ),
  });

  const { data: onlineVisitors, isLoading: isOnlineVisitorsLoading } =
    useWebsitesOptions(selectedWebsite ?? "");

  return (
    <div className="dashboard flex flex-col gap-y-2">
      {/* select websites */}
      {isGetWebsitesLoading && <Loading />}
      {options && (
        <div className="flex gap-x-4">
          <WebsitesSelect
            options={options}
            placeholder="select a website"
            onSelectedChange={(v) => setSelectedWebsite(v as string)}
            selectedValue={selectedWebsite}
          />
          <div className="flex items-center gap-x-3">
            <OnlineIcon />
            <span>
              在线:{" "}
              <span className="font-medium">
                {isOnlineVisitorsLoading && <Loading />}
                {onlineVisitors}
              </span>
            </span>
          </div>
        </div>
      )}

      {selectedWebsite && (
        <>
          <Chart wid={selectedWebsite} />

          <div className="flex gap-x-6">
            <Card className="basis-1/2 p-4">
              <Pages wid={selectedWebsite} />
            </Card>
            <Card className="basis-1/2 p-4">
              <Referrers wid={selectedWebsite} />
            </Card>
          </div>
          <div className="flex gap-x-6">
            <Card className="basis-1/2 p-4">
              <Country wid={selectedWebsite} />
            </Card>
            <Card className="basis-1/2 p-4">
              <Referrers wid={selectedWebsite} />
            </Card>
          </div>
        </>
      )}
    </div>
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

export { Dashboard };
