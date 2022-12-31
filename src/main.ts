import { once, showUI } from "@create-figma-plugin/utilities";
import { CloseHandler } from "./types";
import {
  getLanguageArray,
  initLanguageStorage,
} from "./utility/languageStorage";
import { updateAll } from "./updateText";
import { i18nInit } from "./utility/i18nUtility";

const updateLanguageToUI = () => {
  const languages = {
    languages: getLanguageArray(),
  };
  console.log("Send message to UI:", languages);
  figma.ui.postMessage(languages);
};

const initUIPlugin = async () => {
  await initLanguageStorage();
  await i18nInit();
};

export default function () {
  initUIPlugin();
  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  showUI({
    width: 340,
    height: 500,
  });

  figma.ui.onmessage = (message, payload: any) => {
    console.log("Plugin got Message:", message);
    updateLanguageToUI();
  };
}
