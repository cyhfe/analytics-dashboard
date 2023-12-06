import * as React from "react";
import { endPoint } from "../../constant";

import { Bar, Line } from "react-chartjs-2";
import { Card } from "../../Components/Card";

import { Stats } from "./Stats";
import dayjs from "dayjs";

interface Uv {
  date: string;
  count: number;
}

type CurrentShowData = "uv" | "pv" | "vpv" | "vd";

function Chart(props: { wid: string }) {
  const { wid } = props;

  const [uv, setUv] = React.useState<Uv[]>();
  const [currentShowData, setCurrentShowData] = React.useState<Uv[]>();
  const getUv = React.useCallback(async () => {
    const { uv } = (await fetch(
      endPoint + "/uv?" + new URLSearchParams({ wid })
    )
      .then((res) => res.json())
      .catch((err) => console.log(err))) as {
      uv: {
        timestamp: number;
        count: number;
      }[];
    };
    setUv(
      uv.map((item) => ({
        count: item.count,
        date: dayjs(item.timestamp).format("YYYY-MM-DD HH:mm"),
      }))
    );
  }, [wid]);

  React.useEffect(() => {
    getUv();
  }, [getUv]);

  const options = React.useMemo(() => {
    return {
      parsing: {
        xAxisKey: "date",
        yAxisKey: "count",
      },
    };
  }, []);

  const data = React.useMemo(() => {
    return {
      datasets: [
        {
          data: uv,
        },
      ],
    };
  }, [uv]);

  const totalUv = React.useMemo(() => {
    if (!uv) return 0;
    return uv.reduce((acc, item) => {
      return (acc += item.count);
    }, 0);
  }, [uv]);

  return (
    <>
      <Stats uv={totalUv} />
      <Card className="bg-white p-8">
        <div className="">
          <Line className="h-[300px] w-full" options={options} data={data} />
        </div>
      </Card>
    </>
  );
}

export { Chart };
