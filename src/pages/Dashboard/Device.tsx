import * as React from "react";
import { Button } from "./components/Button";
import { useDashboard } from ".";
import { Devices, useDevices } from "./query";

type Active = keyof Devices;

function Device() {
  const { wid } = useDashboard("Device");

  const { data: devices } = useDevices({ wid });

  const [active, setActive] = React.useState<Active>("browser");

  const sortedDevices = React.useMemo(() => {
    return devices?.[active].sort((a, b) => {
      return b.count - a.count;
    });
  }, [active, devices]);

  return (
    <div className="prose">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="m-0">Device</h4>
        <div>
          <div className="inline-flex  items-center justify-center rounded-lg bg-slate-100 p-1">
            <Button
              onClick={() => setActive("browser")}
              active={active === "browser"}
            >
              浏览器
            </Button>
            <Button onClick={() => setActive("os")} active={active === "os"}>
              操作系统
            </Button>
            <Button
              onClick={() => setActive("device")}
              active={active === "device"}
            >
              设备
            </Button>
          </div>
        </div>
      </div>

      <div className="flex max-h-[500px] flex-col items-stretch gap-y-1 overflow-auto px-4 py-2">
        {sortedDevices &&
          sortedDevices.map(({ name, count }) => (
            <div className="flex justify-between" key={name}>
              <div>{name === "" ? "unknown" : name}</div>
              <div>{count}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export { Device };
