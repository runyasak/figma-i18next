import { Resource, ResourceLanguage } from "i18next";
import { defaultLanguageStorage } from "./defaultStorage";

const storageKeys = {
  LANGUAGES: "LanguageStorage",
};

let languages: Resource = {};

const initLanguageStorage = async () => {
  let languageStorage = await figma.clientStorage.getAsync(
    storageKeys.LANGUAGES
  );

  if (typeof languageStorage === "undefined") {
    await figma.clientStorage.setAsync(
      storageKeys.LANGUAGES,
      defaultLanguageStorage
    );
  } else {
    languages = defaultLanguageStorage;
  }
};

function loadIntepolation(lang: string): ResourceLanguage {
  if (languages[lang] != undefined) {
    return languages[lang];
  } else {
    return {};
  }
}

const getLanguageResource = (): Resource => {
  return languages;
};

export { initLanguageStorage, getLanguageResource };
