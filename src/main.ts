import { emit, once, on, showUI } from "@create-figma-plugin/utilities";
import { CloseHandler } from "./types";
import {
  getLanguageArray,
  initLanguageStorage,
} from "./utility/languageStorage";
import { i18nInit } from "./utility/i18nUtility";

const initUIPlugin = async () => {
  await initLanguageStorage();
  await i18nInit();
  updateLanguageToUI();
};

// Post message to UI
const updateLanguageToUI = () => {
  emit("UPDATE_LANGUAGES", getLanguageArray());
};

export default function () {
  initUIPlugin();
  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  // Receive message from UI
  on("CHANGE_TAB", (data: any) => {
    updateLanguageToUI();
  });

  showUI({
    width: 340,
    height: 500,
  });
}
