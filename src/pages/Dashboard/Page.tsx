import * as React from "react";
import { endPoint } from "../../constant";
import { Card } from "../../Components/Card";

interface Referrer {
  referrer: string;
  count: number;
}

function Referrer(props: { wid: string }) {
  const { wid } = props;

  const [referrers, setReferrers] = React.useState<Referrer[]>();
  const [totalCount, setTotalCount] = React.useState<number>();

  const getViewData = React.useCallback(async () => {
    const { referrer: r, totalCount: t } = (await fetch(
      endPoint + "/referrer?" + new URLSearchParams({ wid })
    )
      .then((res) => res.json())
      .catch((err) => console.log(err))) as {
      referrer: Referrer[];
      totalCount: number;
    };
    setReferrers(r);
    setTotalCount(t);
  }, [wid]);

  React.useEffect(() => {
    getViewData();
  }, [getViewData]);
  return (
    <Card>
      {referrers &&
        referrers.map((referrer) => {
          return (
            <div key={referrer.referrer} className="flex justify-between">
              <div>
                {!referrer.referrer
                  ? "direct"
                  : new URL(referrer.referrer).hostname}
              </div>
              <div>
                {referrer.count}-
                {((referrer.count / (totalCount ?? 0)) * 100).toFixed(1) + "%"}
              </div>
            </div>
          );
        })}
    </Card>
  );
}

export { Referrer };
