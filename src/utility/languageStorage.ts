import { Resource, ResourceLanguage } from "i18next";
import { defaultLanguageStorage } from "./defaultStorage";

type Languages = {
  language: string;
  resourceLanguage: ResourceLanguage;
}[];

const storageKeys = {
  LANGUAGES: "LanguageStorage",
};

let languageResources: Resource = {};

const getLanguageResource = (): Resource => {
  return languageResources;
};

const getLanguages = (): string[] => {
  return getLanguageArray().map((l) => l.language);
};

const getLanguageArray = (): Languages => {
  return Object.entries(languageResources).map(
    ([language, resourceLanguage]) => ({
      language,
      resourceLanguage,
    })
  );
};

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
    languageResources = defaultLanguageStorage;
  }
};

// function loadIntepolation(lang: string): ResourceLanguage {
//   if (languageResources[lang] != undefined) {
//     return languageResources[lang];
//   } else {
//     return {};
//   }
// }

export {
  initLanguageStorage,
  getLanguageResource,
  getLanguageArray,
  getLanguages,
};

export type { Languages };
