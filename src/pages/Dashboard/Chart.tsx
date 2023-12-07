import * as React from "react";
import { endPoint } from "../../constant";

import { Bar, Line } from "react-chartjs-2";
import { Card } from "../../Components/Card";

import { Stats } from "./Stats";
import dayjs from "dayjs";
import { useDashboard } from ".";
import { useMainpanel } from "./MainPanel";
import { SelectedPanel, usePageView, useUniqueVisitors } from "./query";
import { timeDuration } from "../../utils";

interface Uv {
  date: string;
  count: number;
}

export interface Stats {
  uniqueVisitors: number;
  totalVisits: number;
  totalPageViews: number;
  viewsPerVisit: number;
  avgVisitDuration: number;
}

const map = {
  uniqueVisitors: {
    ykey: "count",
  },
  totalVisits: {
    ykey: "sessions",
  },
  totalPageViews: {
    ykey: "count",
  },
  viewsPerVisit: {
    ykey: "duration",
  },
  avgVisitDuration: {
    ykey: "duration",
  },
};

function Chart() {
  const { wid } = useDashboard("Chart");
  const { selectedPanel } = useMainpanel("Chart");
  const { data: uvData } = useUniqueVisitors({ wid });
  const { data: pvData } = usePageView({ wid });

  const chartData = React.useMemo(() => {}, []);

  React.useEffect(() => {
    console.log(pvData, "11");
  }, [pvData]);

  const chartDate = React.useMemo(() => {
    console.log(pvData, "2", selectedPanel);

    let data;
    switch (selectedPanel) {
      case "uniqueVisitors":
        if (uvData) {
          data = uvData.map((d) => ({ x: d.date, y: d.count }));
        }
        break;
      case "totalVisits":
        if (pvData) {
          data = pvData.map((d) => {
            return {
              x: d.date,
              y: d.sessions,
            };
          });
        }
        break;
      case "totalPageViews":
        if (pvData) {
          data = pvData.map((d) => {
            return {
              x: d.date,
              y: d.count,
            };
          });
        }
        break;
      case "avgVisitDuration":
        if (pvData) {
          data = pvData.map((d) => {
            return {
              x: d.date,
              y: (d.duration / d.sessions / 1000).toPrecision(2),
            };
          });
        }
        break;
      default:
        break;
    }

    console.log(data);
    return {
      datasets: [
        {
          data,
        },
      ],
    };
  }, [pvData, selectedPanel, uvData]);

  return (
    <Card className="bg-white p-8">
      <Line className="h-[300px] w-full" data={chartDate} />
    </Card>
  );
}

export { Chart };
