import { Chart } from "./Chart";
import { Stats } from "./Stats";
import { createContext } from "@cyhfe/react-ui";
import * as React from "react";
import { SelectedPanel, Filter } from "./query";
import { Select } from "../../Components/Select";

interface MainPanelContextValue {
  selectedPanel: SelectedPanel;
  updateSelectedPanel: (selectedPanel: SelectedPanel) => void;
  updateFilter: (value: Filter) => void;
  filter: Filter;
}

const [MainPanelProvider, useMainpanel] =
  createContext<MainPanelContextValue>("MainPanel");

const options = [
  {
    value: "alltime",
    label: "所有时间",
  },
  {
    value: "day",
    label: "今天",
  },
  {
    value: "week",
    label: "过去一周",
  },
  {
    value: "month",
    label: "过去一月",
  },
  {
    value: "year",
    label: "过去一年",
  },
];

function MainPanel() {
  const [filter, setFilter] = React.useState<Filter>("alltime");
  const [selectedPanel, setSelectedPanel] =
    React.useState<SelectedPanel>("uniqueVisitors");

  const updateSelectedPanel = React.useCallback(
    (selectedPanel: SelectedPanel) => {
      setSelectedPanel(selectedPanel);
    },
    [],
  );

  const updateFilter = React.useCallback((value: Filter) => {
    setFilter(value);
  }, []);

  return (
    <MainPanelProvider
      selectedPanel={selectedPanel}
      updateSelectedPanel={updateSelectedPanel}
      updateFilter={updateFilter}
      filter={filter}
    >
      <Select
        options={options}
        selectedValue={filter}
        onSelectedChange={(f) => setFilter(f as Filter)}
      />
      <Stats />
      <Chart />
    </MainPanelProvider>
  );
}

export { MainPanel, useMainpanel };
