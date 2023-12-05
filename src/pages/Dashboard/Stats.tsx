import * as React from "react";

import { wid, endPoint } from "../../constant";
import { Card } from "../../Components/Card";

interface Stats {
  uniqueVisitors: number;
  onlineVisitors: number;
  totalVisits: number;
  totalPageViews: number;
  viewsPerVisit: number;
  avgVisitDuration: number;
}
function Stats() {
  const [stats, setStats] = React.useState<Stats | null>(null);
  React.useEffect(() => {
    (async () => {
      try {
        const res = (await (
          await fetch(endPoint + "/stats" + "?" + new URLSearchParams({ wid }))
        ).json()) as Stats;
        setStats(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-x-2 md:gap-x-4">
      <Card className="p-4">
        <div>{stats?.uniqueVisitors ?? "??"}</div>
        <div>历史访问人数</div>
      </Card>
      <Card className="p-4">
        <div>{stats?.totalVisits ?? "??"}</div>
        <div>访问次数</div>
      </Card>
      <Card className="p-4">
        <div>{stats?.totalPageViews ?? "??"}</div>
        <div>页面浏览量</div>
      </Card>
      <Card className="p-4">
        <div>{stats?.viewsPerVisit ?? "??"}</div>
        <div>人均浏览页面</div>
      </Card>
      <Card>
        <div>{stats?.avgVisitDuration ?? "??"}</div>
        <div>平均停留时间</div>
      </Card>
    </div>
  );
}

export { Stats };
