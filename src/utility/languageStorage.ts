import { Resource, ResourceLanguage } from "i18next";
import { defaultLanguageStorage } from "./defaultStorage";

type Language = {
  language: string;
  resourceLanguage: ResourceLanguage;
};

type Languages = Language[];

const storageKeys = {
  LANGUAGES: "LanguageStorage",
};

let languageResources: Resource = {};

const getLanguageResource = (): Resource => {
  return languageResources;
};

const getLanguageNames = (): string[] => {
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

const saveLanguageResouceToStorage = async () => {
  await figma.clientStorage.setAsync(storageKeys.LANGUAGES, languageResources);
}

const setLanguageResource = (language:Language) => {
  languageResources[language.language] = language.resourceLanguage
  saveLanguageResouceToStorage();
}

const initLanguageStorage = async () => {
  let languageStorage = await figma.clientStorage.getAsync(
    storageKeys.LANGUAGES
  );
  
  if (typeof languageStorage === "undefined") {
    languageResources = defaultLanguageStorage;
    await figma.clientStorage.setAsync(
      storageKeys.LANGUAGES,
      defaultLanguageStorage
    );
  } else {
    languageResources = languageStorage;
  }
};

export {
  initLanguageStorage,
  getLanguageResource,
  getLanguageArray,
  getLanguageNames,
  setLanguageResource
};

export type { Languages, Language };
