import { useEffect, useState } from "react";

const data = [
  { title: "访问人数", value: "xx人" },
  { title: "访问次数", value: "xx人" },
  { title: "全页面浏览量", value: "xx人" },
  { title: "人均页面浏览", value: "xx人" },
  { title: "平均浏览时间", value: "xx人" },
];
const wid = "7b66286c-bf36-4b57-b810-a967b13c0af4";
const endPoint = "http://localhost:4002/api/analytics";

interface Stats {
  uniqueVisitors: number;
  onlineVisitors: number;
  totalVisits: number;
  totalPageViews: number;
  viewsPerVisit: number;
  avgVisitDuration: number;
}

function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = (await (
          await fetch(endPoint + "/stats" + "?" + new URLSearchParams({ wid }))
        ).json()) as Stats;
        setStats(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="flex">
        <div>select website</div>
        {stats && <div>当前在线 {stats.onlineVisitors} 人</div>}
      </div>
      <div className="flex">
        <div>
          <div>{stats?.uniqueVisitors}</div>
          <div>历史访问人数</div>
        </div>
        <div>
          <div>{stats?.totalVisits}</div>
          <div>访问次数</div>
        </div>
        <div>
          <div>{stats?.totalPageViews}</div>
          <div>页面浏览量</div>
        </div>
        <div>
          <div>{stats?.viewsPerVisit}</div>
          <div>人均浏览页面</div>
        </div>
        <div>
          <div>{stats?.avgVisitDuration}</div>
          <div>平均停留时间</div>
        </div>
      </div>
    </div>
  );
}

export { Dashboard };
