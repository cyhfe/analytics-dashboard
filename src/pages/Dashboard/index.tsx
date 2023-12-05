import { Stats } from "./Stats";
function Dashboard() {
  return (
    <div className="dashboard flex flex-col gap-y-2">
      <Stats />

      {/* <div>asdasd</div> */}

      {/* <div className="border">
        {count && timeSeries && (
          <LineChart
            xAxis={[{ data: timeSeries, scaleType: "time" }]}
            series={[
              {
                data: count,
              },
            ]}
            height={300}
          />
        )}
      </div> */}
    </div>
  );
}

export { Dashboard };
