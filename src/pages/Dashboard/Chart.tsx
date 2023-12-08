import * as React from "react";
import { Card } from "../../Components/Card";

import { useDashboard } from ".";
import { useMainpanel } from "./MainPanel";
import { useCharts } from "./query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dayjs from "dayjs";

export interface Stats {
  uniqueVisitors: number;
  totalVisits: number;
  totalPageViews: number;
  viewsPerVisit: number;
  avgVisitDuration: number;
}

function Chart() {
  const { wid } = useDashboard("Chart");
  const { selectedPanel, filter } = useMainpanel("Chart");

  const { data } = useCharts({ wid, filter });
  const pv = data?.pv;
  const uv = data?.uv;

  const chartDate = React.useMemo(() => {
    let data;
    switch (selectedPanel) {
      case "uniqueVisitors":
        if (uv) {
          data = uv.map((d) => ({
            x: new Date(d.timestamp),
            y: Number(d.amt),
          }));
        }
        break;
      case "totalVisits":
        if (pv) {
          data = pv.map((d) => {
            return {
              x: new Date(d.timestamp),
              y: Number(d.amt),
            };
          });
        }
        break;
      case "totalPageViews":
        if (pv) {
          data = pv.map((d) => {
            return {
              x: new Date(d.timestamp),
              y: Number(d.count),
            };
          });
        }
        break;
      case "avgVisitDuration":
        if (pv) {
          data = pv.map((d) => {
            return {
              x: new Date(d.timestamp),
              y: Number(
                (Number(d.duration) / Number(d.amt) / 1000).toPrecision(2),
              ),
            };
          });
        }
        break;
      case "viewsPerVisit":
        if (pv) {
          data = pv.map((d) => {
            return {
              x: new Date(d.timestamp),
              y: Number((Number(d.count) / Number(d.amt)).toPrecision(2)),
            };
          });
        }
        break;
      default:
        break;
    }

    return data;
  }, [pv, selectedPanel, uv]);

  return (
    <Card className="flex items-center justify-center bg-white">
      {
        <ResponsiveContainer height={400}>
          <AreaChart
            data={chartDate}
            margin={{ top: 20, right: 40, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="x"
              tickFormatter={(v) => dayjs(v).format("MM-DD HH:mm")}
            />
            <YAxis dataKey="y" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              labelFormatter={(value) => {
                return dayjs(value).format("YYYY-MM-DD HH:mm");
              }}
            />
            <Area
              type="monotone"
              dataKey="y"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      }
    </Card>
  );
}

export { Chart };
