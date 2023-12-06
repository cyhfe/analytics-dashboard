import { Stats } from "./Stats";
import { endPoint } from "../../constant";
import * as React from "react";
import { Select } from "../../Components/Select";
import { Chart } from "./Chart";
import { Referrers } from "./Referrer";
import { Pages } from "./Pages";
import { Card } from "../../Components/Card";
interface Websites {
  domain: string;
  id: string;
}
function Dashboard() {
  const [websites, setWebsites] = React.useState<Websites[]>();
  const [selectedWebsite, setSelectedWebsite] = React.useState<string>();
  const [online, setOnline] = React.useState<number>();

  const getWebsites = async () => {
    const res = (await fetch(endPoint + "/websites").then((res) =>
      res.json()
    )) as Websites[];
    setWebsites(res);
  };

  const getOnline = React.useCallback(async () => {
    if (!selectedWebsite) return;
    const res = (await fetch(
      endPoint + "/online?" + new URLSearchParams({ wid: selectedWebsite })
    ).then((res) => res.json())) as {
      onlineVisitors: number;
    };
    setOnline(res.onlineVisitors);
  }, [selectedWebsite]);

  React.useEffect(() => {
    getWebsites();
  }, []);

  React.useEffect(() => {
    getOnline();
  }, [getOnline]);

  React.useEffect(() => {
    if (websites && websites.length) {
      setSelectedWebsite(websites[0].id);
    }
  }, [websites]);

  const options = React.useMemo(() => {
    if (!websites) return null;
    return websites.map((website) => {
      return {
        value: website.id,
        label: website.domain,
      };
    });
  }, [websites]);

  return (
    <div className="dashboard flex flex-col gap-y-2">
      {selectedWebsite && (
        <>
          {options && (
            <div className="flex justify-between p-2">
              <div className="flex items-center gap-x-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span>
                  在线: <span className="font-medium">{online ?? "?"}</span>
                </span>
              </div>
              <Select
                options={options}
                placeholder="select a website"
                onSelectedChange={(v) => setSelectedWebsite(v as string)}
                selectedValue={selectedWebsite}
              />
            </div>
          )}

          <Stats />

          <Chart wid={selectedWebsite} />

          <div className="flex gap-x-6">
            <Card className="basis-1/2 p-4">
              <Pages wid={selectedWebsite} />
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

export { Dashboard };
