export default { title: "Examples/LineChart", tags: ["autodocs"] };
import * as d3 from "d3";
import * as React from "react";

interface Data {
  x: Date;
  y: number;
}

interface LineChartProps {
  data: Data[];
}

export function LineChart({ data }: LineChartProps) {
  const width = 928;
  const height = 400;
  const marginTop = 40;
  const marginRight = 40;
  const marginBottom = 40;
  const marginLeft = 60;

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const svgRef = React.useRef<SVGSVGElement>(null);

  const [minX = new Date(), maxX = new Date()] = d3.extent(data, (d) => d.x);
  const maxY = d3.max(data, (d) => d.y);

  const x = d3.scaleUtc([minX, maxX], [0, innerWidth]);
  const y = d3.scaleLinear([0, maxY ?? 0], [innerHeight, 0]);

  const lineGenerator = d3
    .line<Data>()
    .x((d) => x(d.x))
    .y((d) => y(d.y));

  React.useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement == null) return;
    const svg = d3.select(svgElement);
    const svgOffset = svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, ${marginTop})`);

    // svgOffset
    //   .append("rect")
    //   .attr("width", innerWidth)
    //   .attr("height", innerHeight)
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue");

    svgOffset.append("g").attr("transform", `translate(0,${innerHeight})`).call(
      d3.axisBottom(x)
      // .ticks(width / 80)
      // .tickSizeOuter(0)
    );

    svgOffset
      .append("g")
      .call(d3.axisLeft(y))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", 0)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", 0)
          .attr("y", 0)
          .attr("fill", "currentColor")
          .attr("text-anchor", "middle")
          .text("↑ Daily close ($)")
      );

    svgOffset
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineGenerator(data));
  }, [data, innerHeight, innerWidth, lineGenerator, x, y]);

  return <svg ref={svgRef} viewBox={`0, 0, ${width}, ${height}`}></svg>;
}
