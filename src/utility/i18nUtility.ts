import i18next from "i18next";
import { getLanguageResource } from "./languageStorage";

async function i18nInit() {
  i18next.init({
    compatibilityJSON: "v4",
    fallbackLng: ["en"],
    debug: true,
    resources: getLanguageResource(),
    interpolation: {
      escapeValue: false,
    },
  });

  i18next.changeLanguage("th", (err, t) => {
    if (err) console.log("Error:", err);
  });
}

export { i18nInit };
