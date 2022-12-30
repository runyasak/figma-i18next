import { TText } from "./tText";
import i18next from "i18next";
import { getLanguageArray, getLanguages } from "./languageStorage";

export async function loadFont(text: TextNode) {
  const font = <FontName>text.fontName;
  await figma.loadFontAsync({ family: font.family, style: font.style });
}

type TTextByLanguage = {
  [key: string]: TText[];
};

const findAllTextNode = (): Array<TextNode> => {
  let textNode: Array<TextNode> = [];
  const sceneNodes = figma.currentPage.findAll(
    (node) => node.type === "TEXT" && /#t.|_#t./.test(node.name)
  );

  sceneNodes.forEach((n) => {
    if (n.type === "TEXT") {
      textNode.push(<TextNode>n);
    }
  });

  return textNode;
};

function OrderTextNodeByLanguage(textNodes: Array<TextNode>): Array<TText> {
  let tTextByLanguage: TTextByLanguage = {};
  const languages = getLanguages();

  //prepare group
  languages.forEach((key) => {
    tTextByLanguage[key] = [];
  });

  console.log("x");

  //create tText and group by language
  textNodes.forEach((node) => {
    let tText = new TText(node);
    tTextByLanguage[tText.language]?.push(tText);
  });

  console.log("y");

  // flatten tText
  let tTexts: Array<TText> = [];
  languages.forEach((lang) => {
    tTextByLanguage[lang].forEach((tText) => {
      tTexts.push(tText);
    });
  });

  return tTexts;
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
  const allTextNode = findAllTextNode();
  const allTextOrderByLanguage = OrderTextNodeByLanguage(allTextNode);

  await Promise.all(
    allTextOrderByLanguage.map((tText) => {
      return updateValue(tText);
    })
  );
}

export { updateAllTextProperty };

export type { TTextByLanguage };
