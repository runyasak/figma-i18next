import { setRelaunchButton } from "@create-figma-plugin/utilities";
import i18next from "i18next";

async function loadFont(text: TextNode) {
  const font = <FontName>text.fontName;
  await figma.loadFontAsync({ family: font.family, style: font.style });
}

function findIntepolationText(lang: string = "en"): string {
  const text = figma.currentPage.findAll((n) => n.name === `##key.${lang}`);
  const textNode = <TextNode>text[0];
  return `{ ${textNode.characters} }`;
}

async function updateValue(tn: TextNode, translate: string) {
  const updateValue = i18next.t(translate);
  console.log("----");
  console.log("Translate: ", translate);
  console.log("textNode origin: ", tn.characters);
  console.log("update Value: ", updateValue);
  // if (textNode?.characters !== updateValue) {
  await loadFont(tn).then(() => {
    // textNode.characters = updateValue;
    console.log("on update: ", updateValue);
    console.log("name: ", tn.name);
    tn.characters = updateValue;
  });
  // }
}

async function updateAllTextProperty() {
  const textJsonEn = findIntepolationText("en");
  const textJsonTh = findIntepolationText("th");

  const jsonObjectEn = JSON.parse(textJsonEn);
  const jsonObjectTh = JSON.parse(textJsonTh);

  i18next.init({
    compatibilityJSON: "v3",
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

  i18next.changeLanguage("en", (err, t) => {
    if (err) console.log("Error:", err);
  });

  const textNodes = figma.currentPage.findAll(
    (node) => /#t.|_#t./.test(node.name) && node.type == "TEXT"
  );

  await Promise.all(
    textNodes.map((textNode) => {
      const names = textNode.name.match(/_?#t.?([a-zA-Z0-9]*)/);
      if (textNode.type == "TEXT" && names) {
        return updateValue(<TextNode>textNode, names[1]);
      }
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
