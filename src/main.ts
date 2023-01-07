import { emit, once, on, showUI } from "@create-figma-plugin/utilities";
import { CloseHandler } from "./types";
import {
  getLanguageArray,
  initLanguageStorage,
  deleteLanguageResource,
  replaceLanguageResource,
} from "./utility/languageStorage";
import { Language, setLanguageResource } from "./utility/languageStorage";
import { i18nInit } from "./utility/i18nUtility";

const initUIPlugin = async () => {
  await initLanguageStorage();
  await i18nInit();
  updateLanguageToUI();
};

// Post message to UI
const updateLanguageToUI = () => {
  console.log("Update Language To UI");
  emit("UPDATE_LANGUAGES", getLanguageArray());
};

export default function () {
  initUIPlugin();

  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  // Receive message from UI
  // on("CHANGE_TAB", (data: any) => {
  //   updateLanguageToUI();
  // });

  on("SAVE_LANGUAGE", (currentLanguageName: string, language: Language) => {
    console.log("SAVE Language", language);
    if (language.language === currentLanguageName) {
      setLanguageResource(language);
    } else {
      replaceLanguageResource(currentLanguageName, language);
    }
    updateLanguageToUI();
  });

  on("DELETE_LANGUAGE", (languageName: string) => {
    console.log("Receive DELETE", languageName);
    deleteLanguageResource(languageName);
    updateLanguageToUI();
  });

  on("ADD_LANGUAGE", (languageName: Language) => {
    console.log("Receive Add");
  });

  showUI({
    width: 340,
    height: 500,
  });
}
