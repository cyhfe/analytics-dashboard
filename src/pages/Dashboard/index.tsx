import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Stats } from "./Stats";
import { wid, endPoint } from "../../constant";

type ViewDataAccumulator = {
  [key: string]: { duration: number; count: number };
};

interface Stats {
  uniqueVisitors: number;
  onlineVisitors: number;
  totalVisits: number;
  totalPageViews: number;
  viewsPerVisit: number;
  avgVisitDuration: number;
  viewDataAccumulator: ViewDataAccumulator;
}

function Dashboard() {
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

  // const view;

  const countChartData = React.useMemo(() => {
    const viewDataAccumulator = stats?.viewDataAccumulator;
    const data =
      viewDataAccumulator &&
      Object.keys(viewDataAccumulator).map((key) => {
        return {
          x: new Date(Number(key)),
          y: viewDataAccumulator[key].count,
        };
      });
    console.log(data);
    return data;
  }, [stats?.viewDataAccumulator]);

  const count = React.useMemo(() => {
    return (
      stats?.viewDataAccumulator &&
      Object.keys(stats.viewDataAccumulator).map(
        (key) => stats.viewDataAccumulator[key].count
      )
    );
  }, [stats?.viewDataAccumulator]);

  const timeSeries = React.useMemo(() => {
    return (
      stats?.viewDataAccumulator &&
      Object.keys(stats.viewDataAccumulator).map(
        (timestamp) => new Date(Number(timestamp))
      )
    );
  }, [stats?.viewDataAccumulator]);

  console.log(count, "data");

  const durationChartData = React.useMemo(() => {
    const viewDataAccumulator = stats?.viewDataAccumulator;
    const data =
      viewDataAccumulator &&
      Object.keys(viewDataAccumulator).map((key) => {
        return {
          x: new Date(Number(key)),
          y: viewDataAccumulator[key].duration,
        };
      });
    console.log(data);
    return data;
  }, [stats?.viewDataAccumulator]);

  // console.log(durationChartData);

  return (
    <div>
      <Stats />

      <div className=" border">
        {count && timeSeries && (
          <LineChart
            xAxis={[{ data: timeSeries, scaleType: "time" }]}
            series={[
              {
                data: count,
              },
            ]}
            width={500}
            height={300}
          />
        )}
      </div>
    </div>
  );
}

export { Dashboard };
