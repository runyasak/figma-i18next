import {
  Button,
  Columns,
  Container,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace,
  Tabs,
  TabsOption,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Layers } from "./page/layers";
import { Setting } from "./page/setting";
import { Library } from "./page/Library";
import { Component } from "./page/Component";

import { CloseHandler, CreateRectanglesHandler } from "./types";

function Plugin() {
  const [currentTab, setCurrentTab] = useState("Layers");

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setCurrentTab(newValue);
  }

  const options: Array<TabsOption> = [
    {
      children: <Layers />,
      value: "Layers",
    },
    {
      children: <Component />,
      value: "Component",
    },
    {
      children: <Library />,
      value: "Library",
    },
    {
      children: <Setting />,
      value: "Setting",
    },
  ];

  return <Tabs onChange={handleChange} options={options} value={currentTab} />;
}

export default render(Plugin);
