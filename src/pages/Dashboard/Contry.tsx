import * as React from "react";
import { timeDuration } from "../../utils";
import { Button } from "./components/Button";
import { useDashboard } from ".";
import { useCountries } from "./query";

type Active = "count" | "duration" | "sessions";

function Country() {
  const { wid } = useDashboard("Country");

  const { data: countries } = useCountries({ wid });

  const [active, setActive] = React.useState<Active>("count");

  const sortCountries = React.useMemo(() => {
    return countries?.sort((a, b) => {
      return b[active] - a[active];
    });
  }, [active, countries]);

  return (
    <div className="prose">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="m-0">Region</h4>
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

      <div className="flex max-h-[500px] flex-col items-stretch gap-y-1 overflow-auto px-4 py-2">
        {sortCountries &&
          sortCountries.map(({ country, count, duration, sessions }) => (
            <div className="flex justify-between" key={country}>
              <div>{country === "" ? "unknown" : country}</div>
              <div>
                {active === "count" && <div>{count}</div>}
                {active === "duration" && <div>{timeDuration(duration)}</div>}
                {active === "sessions" && <div>{sessions}</div>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export { Country };
