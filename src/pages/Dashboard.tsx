const data = [
  { title: "访问人数", value: "xx人" },
  { title: "访问次数", value: "xx人" },
  { title: "全页面浏览量", value: "xx人" },
  { title: "人均页面浏览", value: "xx人" },
  { title: "平均浏览时间", value: "xx人" },
];
function Dashboard() {
  return (
    <div className="container">
      <div className="flex">
        <div>select website</div>
        <div>当前在线 xx 人</div>
      </div>
      <div className="flex">
        {data.map((d) => {
          return (
            <div>
              <div>{d.title}</div>
              <div>{d.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Dashboard };
