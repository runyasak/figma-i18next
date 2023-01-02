import { emit, once, on, showUI } from "@create-figma-plugin/utilities";
import { CloseHandler } from "./types";
import {
  getLanguageArray,
  initLanguageStorage,
} from "./utility/languageStorage";
import { updateAll } from "./updateText";
import { i18nInit } from "./utility/i18nUtility";

const initUIPlugin = async () => {
  await initLanguageStorage();
  await i18nInit();
};

// Post message to UI
const updateLanguageToUI = () => {
  console.log("Send message to UI:", getLanguageArray());

  // Original
  // const languageMessage = {
  //   languages: getLanguageArray(),
  // };
  // figma.ui.postMessage(languagesMessage);

  emit("UPDATE_LANGUAGES", getLanguageArray());
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

  // Receive message from UI

  // Original
  // figma.ui.onmessage = (message, payload: any) => {
  //   console.log("Recieve message from UI:", message);
  //   updateLanguageToUI();
  // };

  // New toy
  const handleChageTab2 = (data: any) => {
    console.log("Receive message from UI", data);
    updateLanguageToUI();
  };
  on("CHANGE_TAB_2", updateLanguageToUI);
}
