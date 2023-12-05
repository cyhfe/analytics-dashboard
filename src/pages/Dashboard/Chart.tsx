import * as React from "react";
import { endPoint } from "../../constant";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "../../Components/Card";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  // Title,
  Tooltip
  // Legend
);

interface ViewData {
  [key: string]: {
    duration: number;
    count: number;
  };
}

const options = {
  // responsive: true,
  // bezierCurve: false,
  // plugins: {
  //   // legend: {
  //   //   position: "top" as const,
  //   // },
  //   // title: {
  //   //   display: true,
  //   //   text: "Line Chart",
  //   // },
  // },
};

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

  const stayDuration = React.useMemo(() => {
    console.log("memo");

    if (!viewData) return null;
    return Object.keys(viewData).map((key) =>
      (viewData[key].duration / 1000).toFixed(0)
    );
  }, [viewData]);

  const times = React.useMemo(() => {
    console.log("memo");
    if (!viewData) return null;
    return Object.keys(viewData).map((key) =>
      dayjs(Number(key)).format("MM-DD HH点")
    );
  }, [viewData]);

  const data = times && {
    labels: times,
    datasets: [
      // {
      //   label: "浏览时间(秒)",
      //   data: stayDuration,
      //   borderColor: "rgb(0, 0, 0)",
      //   backgroundColor: "rgb(255, 255, 255)",
      //   tension: 0.3,
      // },
      {
        label: "页面浏览量",
        data: counts,
        borderColor: "rgb(255, 255, 255)",
        backgroundColor: "#cbd5e1",
      },
    ],
  };

  return (
    <Card className="bg-white p-4">
      {options && data && <Bar options={options} data={data} />}
    </Card>
  );
}

export { Chart };
