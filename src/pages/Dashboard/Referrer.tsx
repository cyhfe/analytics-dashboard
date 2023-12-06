import * as React from "react";
import { endPoint } from "../../constant";
import { timeDuration } from "../../utils";
import { Button } from "./components/Button";
interface Referrer {
  referrer: string;
  duration: number;
  count: number;
  sessions: number;
}

type Active = "count" | "duration" | "sessions";

function Referrers(props: { wid: string }) {
  const { wid } = props;

  const [referrers, setReferrers] = React.useState<Referrer[]>();

  const [active, setActive] = React.useState<Active>("count");

  const sortReferrers = React.useMemo(() => {
    return referrers?.sort((a, b) => {
      return b[active] - a[active];
    });
  }, [active, referrers]);

  const getReferrers = React.useCallback(async () => {
    const { referrers } = (await fetch(
      endPoint + "/referrers?" + new URLSearchParams({ wid })
    )
      .then((res) => res.json())
      .catch((err) => console.log(err))) as {
      referrers: Referrer[];
    };
    setReferrers(referrers);
  }, [wid]);

  React.useEffect(() => {
    getReferrers();
  }, [getReferrers]);

  return (
    <div className="prose">
      <div className="flex justify-between items-center mb-2">
        <h4 className="m-0">Referrer</h4>
        <div>
          <div className="inline-flex  items-center justify-center rounded-lg bg-slate-100 p-1">
            <Button
              onClick={() => setActive("count")}
              active={active === "count"}
            >
              点击量
            </Button>
            <Button
              onClick={() => setActive("sessions")}
              active={active === "sessions"}
            >
              用户量
            </Button>
            <Button
              onClick={() => setActive("duration")}
              active={active === "duration"}
            >
              停留时间
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-auto max-h-[500px]  flex flex-col gap-y-1 items-stretch px-4 py-2">
        {sortReferrers &&
          sortReferrers.map((referrer) => (
            <>
              <div className="flex justify-between ">
                <div>
                  {referrer.referrer === "" ? "Direct" : referrer.referrer}
                </div>
                <div>
                  {active === "count" && <div>{referrer.count}</div>}
                  {active === "duration" && (
                    <div>{timeDuration(referrer.duration)}</div>
                  )}
                  {active === "sessions" && <div>{referrer.sessions}</div>}
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export { Referrers };
