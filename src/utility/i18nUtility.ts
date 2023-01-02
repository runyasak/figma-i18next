import i18next from "i18next";
import { getLanguageResource } from "./languageStorage";

async function i18nInit() {
  i18next.init({
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
