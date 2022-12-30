import { setRelaunchButton } from "@create-figma-plugin/utilities";
import { loadFont } from "./utility/textUnility";
import {
  initLanguageStorage,
  getLanguageResource,
} from "./utility/languageStorage";

import { TText } from "./utility/tText";
import i18next, { loadLanguages } from "i18next";

let jsonObjectEn = {};
let jsonObjectTh = {};

// function findIntepolationText(lang: string): string {
//   figma.skipInvisibleInstanceChildren = true;

//   const allTextByLanguage = figma.root
//     .findAllWithCriteria({
//       types: ["TEXT"],
//     })
//     .find((n) => n.name === `##key.${lang}`);

//   if (allTextByLanguage != undefined) {
//     const textNode = <TextNode>allTextByLanguage;
//     return `{ ${textNode.characters} }`;
//   } else {
//     return ``;
//   }
// }

async function updateValue(tText: TText) {
  const textNode = tText.node;
  const translate = tText.key;

  if (i18next.language != tText.language) {
    i18next.changeLanguage(tText.language, (err, t) => {
      if (err) console.log("Error:", err);
    });
  }

  const updateValue = i18next.t(translate);
  if (textNode.characters !== updateValue) {
    await loadFont(textNode).then(() => {
      textNode.characters = updateValue;
    });
  }
}

type TTextByLanguage = {
  [key in "en" | "th"]?: TText[];
};

function findAllText(): TTextByLanguage {
  let tTextByLanguage: TTextByLanguage = {
    en: [],
    th: [],
  };

  const resultNodes: Array<SceneNode> = figma.currentPage.findAll(
    (node) => node.type === "TEXT" && /#t.|_#t./.test(node.name)
  );

  resultNodes.forEach((node) => {
    if (node.type == "TEXT") {
      let tText = new TText(node);
      if (tText.language === "th" || tText.language === "en") {
        tTextByLanguage[tText.language]?.push(tText);
      }
    }
  });
  return tTextByLanguage;
}

async function updateAllTextProperty() {
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

  const tTextByLanguages: TTextByLanguage = findAllText();
  const allTextOrderByLanguage = [
    ...(tTextByLanguages["th"] ? tTextByLanguages["th"] : []),
    ...(tTextByLanguages["en"] ? tTextByLanguages["en"] : []),
  ];

  await Promise.all(
    allTextOrderByLanguage.map((tText) => {
      return updateValue(tText);
    })
  );
}

const updateAll = async () => {
  setRelaunchButton(figma.currentPage, "figma-i18next", {
    description: "🔍 Update text",
  });

  await initLanguageStorage();
  await updateAllTextProperty();
  await figma.closePlugin("Updated 🎉");
};

export default updateAll;

export { updateAllTextProperty };
