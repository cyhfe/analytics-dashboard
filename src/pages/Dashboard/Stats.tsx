import * as React from "react";

import { Card } from "../../Components/Card";
import { useMainpanel } from "./MainPanel";
import { useStats } from "./query";
import { useDashboard } from ".";
import { cn } from "../../utils";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  value: number | string;
  enLabel: string;
  cnLabel: string;
  active: boolean;
}

function Item(props: ItemProps) {
  const { value, active, cnLabel, enLabel, ...rest } = props;
  return (
    <Card
      className={cn(
        "prose cursor-pointer border  p-4 transition hover:border-slate-400 hover:shadow",
        active && "bg-[#22272e] text-white ",
      )}
      {...rest}
    >
      <h1
        className={cn("mb-2 text-[#22272e] transition", active && "text-white")}
      >
        {value}
      </h1>
      <div
        className={cn(
          "mb-1 text-sm text-slate-600 transition",
          active && "text-white",
        )}
      >
        {cnLabel}
      </div>
      <div
        className={cn(
          "text-xs text-slate-400 transition",
          active && "text-slate-300",
        )}
      >
        {enLabel.toUpperCase()}
      </div>
    </Card>
  );
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

function Stats() {
  const { selectedPanel, updateSelectedPanel, filter } = useMainpanel("Stats");
  const { wid } = useDashboard("Stats");
  const { data } = useStats({ wid, filter });

  return (
    <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-x-2 md:gap-x-4">
      <Item
        active={selectedPanel === "uniqueVisitors"}
        value={data?.uniqueVisitors ?? 0}
        {...map.uniqueVisitors}
        onClick={() => updateSelectedPanel("uniqueVisitors")}
      />
      <Item
        active={selectedPanel === "totalVisits"}
        value={data?.totalVisits ?? 0}
        {...map.totalVisits}
        onClick={() => updateSelectedPanel("totalVisits")}
      />
      <Item
        active={selectedPanel === "totalPageViews"}
        value={data?.totalPageViews ?? 0}
        {...map.totalPageViews}
        onClick={() => updateSelectedPanel("totalPageViews")}
      />
      <Item
        active={selectedPanel === "viewsPerVisit"}
        value={data?.viewsPerVisit.toPrecision(2) ?? 0}
        {...map.viewsPerVisit}
        onClick={() => updateSelectedPanel("viewsPerVisit")}
      />
      <Item
        active={selectedPanel === "avgVisitDuration"}
        value={data?.avgVisitDuration ?? 0}
        {...map.avgVisitDuration}
        onClick={() => updateSelectedPanel("avgVisitDuration")}
      />
    </div>
  );
}

export { Stats };
