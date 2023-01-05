import i18next from "i18next";
import { getLanguageResource } from "./languageStorage";

function i18nInit() {
  return i18next.init({
    compatibilityJSON: "v3",
    fallbackLng: ["en"],
    debug: true,
    resources: getLanguageResource(),
    interpolation: {
      escapeValue: false,
    },
  });
}

export { i18nInit };
