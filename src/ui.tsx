import { emit, once, on } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import { Layers } from "./page/layers";
import { Setting } from "./page/setting";
import { Library } from "./page/Library";
import { Components } from "./page/components";
import { render, Tabs, TabsOption } from "@create-figma-plugin/ui";
import { LanguageDetail } from "./page/languageDetail";

function Plugin() {
  // const [currentTab, setCurrentTab] = useState("Layers");
  const [currentTab, setCurrentTab] = useState("Library");
  const [languages, setLanguages] = useState([]);
  const [languagePage, setLanguagePage] = useState("");

  const handleItemClick = (language: string): void => {
    setLanguagePage(language);
  };

  // Post message to main
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setCurrentTab(newValue);
    emit("CHANGE_TAB", newValue);
  }

  // Receive message from main
  on("UPDATE_LANGUAGES", (languages: any) => {
    setLanguages(languages);
    console.log("languages:", languages);
  });

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
      children: (
        <Library languages={languages} onDetailClick={handleItemClick} />
      ),
      value: "Library",
    },
    {
      children: <Setting />,
      value: "Setting",
    },
  ];

  if (languagePage !== "") {
    return (
      <LanguageDetail language={languagePage} onDetailClick={handleItemClick} />
    );
  }

  return <Tabs onChange={handleChange} options={options} value={currentTab} />;
}

export default render(Plugin);
