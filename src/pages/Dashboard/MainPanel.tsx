import { Chart } from "./Chart";
import { Stats } from "./Stats";
import { createContext } from "@cyhfe/react-ui";
import { useCallback, useState } from "react";
import { SelectedPanel } from "./query";

interface MainPanelContextValue {
  selectedPanel: SelectedPanel;
  updateSelectedPanel: (selectedPanel: SelectedPanel) => void;
}

const [MainPanelProvider, useMainpanel] =
  createContext<MainPanelContextValue>("MainPanel");

function MainPanel() {
  const [selectedPanel, setSelectedPanel] =
    useState<SelectedPanel>("uniqueVisitors");

  const updateSelectedPanel = useCallback((selectedPanel: SelectedPanel) => {
    setSelectedPanel(selectedPanel);
  }, []);

  return (
    <MainPanelProvider
      selectedPanel={selectedPanel}
      updateSelectedPanel={updateSelectedPanel}
    >
      <Stats />
      <Chart />
    </MainPanelProvider>
  );
}

export { MainPanel, useMainpanel };
