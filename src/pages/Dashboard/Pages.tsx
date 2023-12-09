import * as React from "react";
import { timeDuration } from "../../utils";
import { Button } from "./components/Button";
import { usePages } from "./query";
import { useDashboard } from ".";

type Active = "count" | "duration" | "sessions";

function Pages() {
  const { wid } = useDashboard("Pages");

  const { data: pages } = usePages({ wid });

  const [active, setActive] = React.useState<Active>("count");

  const sortPages = React.useMemo(() => {
    return pages?.sort((a, b) => {
      return b[active] - a[active];
    });
  }, [active, pages]);

  return (
    <div className="prose">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="m-0">Page</h4>
        <div>
          <div className="inline-flex  items-center justify-center rounded-lg bg-slate-100 p-1">
            <Button
              onClick={() => setActive("count")}
              active={active === "count"}
            >
              浏览量
            </Button>
            <Button
              onClick={() => setActive("sessions")}
              active={active === "sessions"}
            >
              访问次数
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

      <div className="flex max-h-[500px]  flex-col items-stretch gap-y-1 overflow-auto px-4 py-2">
        {sortPages &&
          sortPages.map((page) => (
            <div className="flex justify-between " key={page.pathname}>
              <div>{page.pathname}</div>
              <div>
                {active === "count" && <div>{page.count}</div>}
                {active === "duration" && (
                  <div>{timeDuration(page.duration)}</div>
                )}
                {active === "sessions" && <div>{page.sessions}</div>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export { Pages };
