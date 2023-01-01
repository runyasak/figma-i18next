import { emit } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import { Layers } from "./page/layers";
import { Setting } from "./page/setting";
import { Library } from "./page/Library";
import { Components } from "./page/components";
// import { CloseHandler, CreateRectanglesHandler } from "./types";
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

function Plugin() {
  // const [currentTab, setCurrentTab] = useState("Layers");
  const [currentTab, setCurrentTab] = useState("Library");
  const [languages, setLanguages] = useState([]);

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log("UI Tab Change:", newValue);
    setCurrentTab(newValue);
    const type = "CHANGE_TAB";
    parent.postMessage({ pluginMessage: { type, newValue } }, "*");
  }

  const options: Array<TabsOption> = [
    {
      children: <Layers />,
      value: "Layers",
    },
    {
      children: <Components />,
      value: "Component",
    },
    {
      children: <Library languages={languages} />,
      value: "Library",
    },
    {
      children: <Setting />,
      value: "Setting",
    },
  ];

  onmessage = (event) => {
    console.log("Receive message from Plugin");
    setLanguages(event.data.pluginMessage.languages);
    console.log("Message:", languages);
  };

  return <Tabs onChange={handleChange} options={options} value={currentTab} />;
}

export default render(Plugin);
