import * as React from "react";
import { endPoint } from "../../constant";
import { timeDuration } from "../../utils";
import { Button } from "./components/Button";

interface Country {
  country: string;
  duration: number;
  count: number;
  sessions: number;
}

type Active = "count" | "duration" | "sessions";

function Country(props: { wid: string }) {
  const { wid } = props;

  const [countries, setCountries] = React.useState<Country[]>();

  const [active, setActive] = React.useState<Active>("count");

  const sortCountries = React.useMemo(() => {
    return countries?.sort((a, b) => {
      return b[active] - a[active];
    });
  }, [active, countries]);

  console.log(sortCountries);

  const getCountries = React.useCallback(async () => {
    const { countries } = (await fetch(
      endPoint + "/countries?" + new URLSearchParams({ wid })
    )
      .then((res) => res.json())
      .catch((err) => console.log(err))) as {
      countries: Country[];
    };
    console.log(countries);
    setCountries(countries);
  }, [wid]);

  React.useEffect(() => {
    getCountries();
  }, [getCountries]);

  return (
    <div className="prose">
      <div className="flex justify-between items-center mb-2">
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

      <div className="overflow-auto max-h-[500px]  flex flex-col gap-y-1 items-stretch px-4 py-2">
        {sortCountries &&
          sortCountries.map(({ country, count, duration, sessions }) => (
            <>
              <div className="flex justify-between ">
                <div>{country === "" ? "unknown" : country}</div>
                <div>
                  {active === "count" && <div>{count}</div>}
                  {active === "duration" && <div>{timeDuration(duration)}</div>}
                  {active === "sessions" && <div>{sessions}</div>}
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export { Country };
