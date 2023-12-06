import * as React from "react";

import { endPoint } from "../../constant";
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
    <Card className="prose cursor-pointer p-4 transition hover:bg-slate-200 ">
      <h1 className="mb-2">{props.value}</h1>
      <div>{props.cnLabel}</div>
      <div className="text-sm text-slate-400">
        {props.enLabel.toUpperCase()}
      </div>
    </Card>
  );
}

interface StatsProps {
  uv: number;
}

const map = {
  uniqueVisitors: {
    cnLabel: "独立访客",
    enLabel: "Unique Visitors",
  },
  totalVisits: {
    cnLabel: "总访问次数",
    enLabel: "Total Visits",
  },
  totalPageViews: {
    cnLabel: "总浏览量",
    enLabel: "Total Page Views",
  },
  viewsPerVisit: {
    cnLabel: "人均浏览页面",
    enLabel: "Views Per Visitor",
  },
  avgVisitDuration: {
    cnLabel: "平均访问时长",
    enLabel: "Avg. Visit Duration",
  },
};

function Stats(props: StatsProps) {
  const { uv } = props;

  return (
    <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-x-2 md:gap-x-4">
      <Item value={uv} {...map.uniqueVisitors} />
    </div>
  );
}

export { Stats };
