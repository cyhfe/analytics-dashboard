import * as React from "react";

import { Line } from "react-chartjs-2";
import { Card } from "../../Components/Card";

import { useDashboard } from ".";
import { useMainpanel } from "./MainPanel";
import { usePageView, useUniqueVisitors } from "./query";

export interface Stats {
  uniqueVisitors: number;
  totalVisits: number;
  totalPageViews: number;
  viewsPerVisit: number;
  avgVisitDuration: number;
}

function Chart() {
  const { wid } = useDashboard("Chart");
  const { selectedPanel } = useMainpanel("Chart");
  const { data: uvData } = useUniqueVisitors({ wid });
  const { data: pvData } = usePageView({ wid });

  const chartDate = React.useMemo(() => {
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

    return {
      datasets: [
        {
          data,
        },
      ],
    };
  }, [pvData, selectedPanel, uvData]);

  return (
    <Card className="flex items-center justify-center bg-white p-8">
      <Line data={chartDate} />
    </Card>
  );
}

export { Chart };
