import * as d3 from "d3";
import * as React from "react";
import { SvgContainer } from "./SvgContainer";

interface Data {
  date: Date;
  value: number;
}

interface LineChartProps extends React.PropsWithChildren {
  data: Data;
}

export function LineChart(props: LineChartProps) {
  const width = 928;
  const height = 500;
  const marginTop = 40;
  const marginRight = 60;
  const marginBottom = 40;
  const marginLeft = 60;

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  return (
    <SvgContainer
      viewBox={`0, 0, ${width}, ${height}`}
      marginLeft={marginLeft}
      marginTop={marginTop}
      className="border w-full"
    ></SvgContainer>
  );
}
