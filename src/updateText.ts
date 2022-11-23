import { setRelaunchButton } from "@create-figma-plugin/utilities";
import { traverseNode } from "@create-figma-plugin/utilities";
import { TText } from "./tText";
import i18next from "i18next";

async function loadFont(text: TextNode) {
  const font = <FontName>text.fontName;
  await figma.loadFontAsync({ family: font.family, style: font.style });
}

function findIntepolationText(lang: string = "en"): string {
  figma.skipInvisibleInstanceChildren = true;

  const allTextByLanguage = figma.root
    .findAllWithCriteria({
      types: ["TEXT"],
    })
    .find((n) => n.name === `##key.${lang}`);

  if (allTextByLanguage != undefined) {
    const textNode = <TextNode>allTextByLanguage;
    return `{ ${textNode.characters} }`;
  } else {
    return ``;
  }
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
  const textJsonEn = findIntepolationText("en");
  const textJsonTh = findIntepolationText("th");

  const jsonObjectEn = JSON.parse(textJsonEn);
  const jsonObjectTh = JSON.parse(textJsonTh);

  i18next.init({
    compatibilityJSON: "v4",
    fallbackLng: ["en", "th"],
    debug: true,
    resources: {
      th: {
        translation: jsonObjectTh,
      },
      en: {
        translation: jsonObjectEn,
      },
    },
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

export default function () {
  setRelaunchButton(figma.currentPage, "figma-i18next", {
    description: "🔍 Update text",
  });

  updateAllTextProperty().then(() => {
    figma.closePlugin("Updated 🎉");
  });
}

export { updateAllTextProperty };
