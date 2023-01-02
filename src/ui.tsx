import { emit, once, on } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import { Layers } from "./page/layers";
import { Setting } from "./page/setting";
import { Library } from "./page/Library";
import { Components } from "./page/components";
import { Languages } from "./utility/languageStorage";
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

  // Post message to main
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setCurrentTab(newValue);
    emit("CHANGE_TAB_2", newValue);
  }

  // Receive message from main
  const handleUpdateLanguage = (languages: any) => {
    setLanguages(languages);
  };
  on("UPDATE_LANGUAGES", handleUpdateLanguage);

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

  return <Tabs onChange={handleChange} options={options} value={currentTab} />;
}

export default render(Plugin);
