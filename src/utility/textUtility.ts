import { setRelaunchButton } from "@create-figma-plugin/utilities";
import { initLanguageStorage } from "./languageStorage";

import { TText } from "./tText";
import i18next from "i18next";
import { i18nInit } from "./i18nUtility";

export async function loadFont(text: TextNode) {
  const font = <FontName>text.fontName;
  await figma.loadFontAsync({ family: font.family, style: font.style });
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

async function updateAllTextProperty() {
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

export { updateAllTextProperty };
