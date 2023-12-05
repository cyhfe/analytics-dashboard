import * as React from "react";

import { wid, endPoint } from "../../constant";
import { Card } from "../../Components/Card";
import { timeDuration } from "../../utils";
interface Stats {
  uniqueVisitors: number;
  totalVisits: number;
  totalPageViews: number;
  viewsPerVisit: number;
  avgVisitDuration: number;
}

interface Itemprops {
  value: number | string;
  enLabel: string;
  cnLabel: string;
}
function Item(props: Itemprops) {
  return (
    <Card className="p-4 prose">
      <h1 className="mb-2">{props.value}</h1>
      <div>{props.cnLabel}</div>
      <div className="text-slate-400 text-sm">
        {props.enLabel.toUpperCase()}
      </div>
    </Card>
  );
}
function Stats() {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const getStats = async () => {
    try {
      const res = (await (
        await fetch(endPoint + "/stats" + "?" + new URLSearchParams({ wid }))
      ).json()) as Stats;
      setStats(res);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getStats();
  }, []);

  const renderStats = () => {
    if (!stats) return null;
    const keys = Object.keys(stats) as (keyof Stats)[];
    return keys.map((key) => {
      const map = {
        uniqueVisitors: {
          cnLabel: "独立访客",
          enLabel: "Unique Visitors",
          value: stats.uniqueVisitors,
        },
        totalVisits: {
          cnLabel: "总访问次数",
          enLabel: "Total Visits",
          value: stats.totalVisits,
        },
        totalPageViews: {
          cnLabel: "总浏览量",
          enLabel: "Total Page Views",
          value: stats.totalPageViews,
        },
        viewsPerVisit: {
          cnLabel: "人均浏览页面",
          enLabel: "Views Per Visitor",
          value: stats.viewsPerVisit,
        },
        avgVisitDuration: {
          cnLabel: "平均访问时长",
          enLabel: "Avg. Visit Duration",
          value: timeDuration(stats.avgVisitDuration),
        },
      };
      const props = map[key];
      return <Item key={props.enLabel} {...props} />;
    });
  };

  return (
    <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-x-2 md:gap-x-4">
      {renderStats()}
    </div>
  );
}

export { Stats };
