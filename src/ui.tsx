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
    console.log("UI Tab Change:", newValue);
    setCurrentTab(newValue);

    console.log("Post message to main:", newValue);

    // Original
    // const messageName = "CHANGE_TAB";
    // parent.postMessage({ pluginMessage: { messageName, newValue } }, "*");

    // New toy
    emit("CHANGE_TAB_2", newValue);
  }

  // Receive message from main

  // Original
  // onmessage = (event) => {
  //   console.log("Receive message from main");
  //   setLanguages(event.data.pluginMessage.languages);
  //   console.log("Message:", languages);
  // };

  const handleUpdateLanguage = (languages: any) => {
    console.log("Receive message from main", languages);
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
