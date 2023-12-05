import * as React from "react";
import { endPoint } from "../../constant";

interface ViewData {
  [key: string]: {
    duration: number;
    count: number;
  };
}

function Chart(props: { wid: string }) {
  const { wid } = props;

  const [viewData, setViewData] = React.useState<ViewData[]>();

  const getViewData = React.useCallback(async () => {
    const res = (await fetch(
      endPoint + "/viewData?" + new URLSearchParams({ wid })
    )
      .then((res) => res.json())
      .catch((err) => console.log(err))) as ViewData[];
    setViewData(res);
  }, [wid]);

  React.useEffect(() => {
    getViewData();
  }, [getViewData]);

  React.useEffect(() => {
    console.log(viewData);
  }, [viewData]);

  return <div>chart</div>;
}

export { Chart };
