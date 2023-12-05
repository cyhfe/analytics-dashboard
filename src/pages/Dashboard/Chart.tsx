import * as React from "react";
import { endPoint } from "../../constant";
import { LineChart } from "@mui/x-charts";

interface ViewData {
  [key: string]: {
    duration: number;
    count: number;
  };
}

function Chart(props: { wid: string }) {
  const { wid } = props;

  const [viewData, setViewData] = React.useState<ViewData>();

  const getViewData = React.useCallback(async () => {
    const { viewDataAccumulator } = (await fetch(
      endPoint + "/viewData?" + new URLSearchParams({ wid })
    )
      .then((res) => res.json())
      .catch((err) => console.log(err))) as { viewDataAccumulator: ViewData };
    setViewData(viewDataAccumulator);
  }, [wid]);

  React.useEffect(() => {
    getViewData();
  }, [getViewData]);

  const counts = React.useMemo(() => {
    console.log("memo");

    if (!viewData) return null;
    return Object.keys(viewData).map((key) => viewData[key].count);
  }, [viewData]);

  const times = React.useMemo(() => {
    console.log("memo");
    if (!viewData) return null;
    return Object.keys(viewData).map((key) => new Date(Number(key)));
  }, [viewData]);

  return (
    <>
      {counts && times && (
        <div className="h-[300px] sm:h-[400px] md:h-[500px] bg-white">
          <LineChart
            tooltip={{ trigger: "axis" }}
            series={[{ data: counts, area: true }]}
            xAxis={[{ scaleType: "time", data: times }]}
          />
        </div>
      )}
    </>
  );
}

export { Chart };
