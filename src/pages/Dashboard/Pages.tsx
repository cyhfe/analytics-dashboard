import * as React from "react";
import { endPoint } from "../../constant";
import { cn, timeDuration } from "../../utils";
import { Card } from "../../Components/Card";

interface Page {
  pathname: string;
  duration: number;
  count: number;
  sessions: number;
}

type Active = "count" | "duration" | "sessions";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  active?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props: ButtonProps,
  forwardRef
) {
  const { children, className, active = false, ...rest } = props;
  const activeCn = active ? "bg-white font-medium  text-slate-800 shadow" : "";
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm text-slate-400 font-normal ",
        activeCn,
        className
      )}
      ref={forwardRef}
      {...rest}
    >
      {children}
    </button>
  );
});

function Pages(props: { wid: string }) {
  const { wid } = props;

  const [pages, setPages] = React.useState<Page[]>();

  const [active, setActive] = React.useState<Active>("count");

  const sortPages = React.useMemo(() => {
    return pages?.sort((a, b) => {
      return b[active] - a[active];
    });
  }, [active, pages]);

  const getPages = React.useCallback(async () => {
    const { pages } = (await fetch(
      endPoint + "/pages?" + new URLSearchParams({ wid })
    )
      .then((res) => res.json())
      .catch((err) => console.log(err))) as {
      pages: Page[];
    };
    setPages(pages);
  }, [wid]);

  React.useEffect(() => {
    getPages();
  }, [getPages]);

  return (
    <div className="prose">
      <div className="flex justify-between items-center mb-2">
        <h4 className="m-0">page</h4>
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

      <div className="">
        <div className="overflow-auto max-h-[500px]  flex flex-col gap-y-1 items-stretch px-4 py-2">
          {sortPages &&
            sortPages.map((page) => (
              <>
                <div className="flex justify-between ">
                  <div>{page.pathname}</div>
                  <div>
                    {active === "count" && <div>{page.count}</div>}
                    {active === "duration" && (
                      <div>{timeDuration(page.duration)}</div>
                    )}
                    {active === "sessions" && <div>{page.sessions}</div>}
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export { Pages };
