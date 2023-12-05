import { Stats } from "./Stats";
import { endPoint } from "../../constant";
import * as React from "react";
import { Select } from "../../Components/Select";

interface Websites {
  domain: string;
  id: string;
}
function Dashboard() {
  const [websites, setWebsites] = React.useState<Websites[]>();
  const [selectedWebsite, setSelectedWebsite] = React.useState<string>();

  const getWebsites = async () => {
    const res = (await fetch(endPoint + "/websites").then((res) =>
      res.json()
    )) as Websites[];
    setWebsites(res);
  };

  React.useEffect(() => {
    getWebsites();
  }, []);

  React.useEffect(() => {
    if (websites && websites.length) {
      setSelectedWebsite(websites[0].id);
    }
  }, [websites]);

  const options = React.useMemo(() => {
    return websites?.map((website) => {
      return {
        value: website.id,
        label: website.domain,
      };
    });
  }, [websites]);

  return (
    <div className="dashboard flex flex-col gap-y-2">
      {options && selectedWebsite && (
        <div className="flex justify-between p-2">
          <div className="flex items-center gap-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span>
              在线: <span className="font-medium">{websites?.length}</span>
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

      <div></div>
    </div>
  );
}

export { Dashboard };
