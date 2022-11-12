import { setRelaunchButton } from "@create-figma-plugin/utilities";
import i18next from "i18next";

function findIntepolationText(lang: string = "en"): string {
  const text = figma.currentPage.findAll((n) => n.name === `##key.${lang}`);
  // console.log("tEn", text[0]);
  const textNode = <TextNode>text[0];
  // console.log("char", textNode.characters);
  return `{ ${textNode.characters} }`;
}

// i18next.on("languageChanged", () => {
//   console.log("abc");
// });

function updateAllTextProperty() {
  // const tEn = figma.currentPage.findAll((node) => /##t.en/.test(node.name));

  const textJsonEn = findIntepolationText("en");
  const textJsonTh = findIntepolationText("th");
  // console.log("Json text", textJson);

  const jsonObjectEn = JSON.parse(textJsonEn);
  const jsonObjectTh = JSON.parse(textJsonTh);
  // console.log("Json Object", jsonObject);

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

  // console.log("i18n:", i18next);
  // console.log("i18n resource:", i18next);
  // console.log("i18n language 1", i18next.languages);

  // console.log("th resource", i18next.getDataByLanguage("th"));
  // console.log("en resource", i18next.getDataByLanguage("en"));

  console.log("default hello", i18next.t("hello"));

  i18next.changeLanguage("th", (err, t) => {
    if (err) console.log("Error:", err);
    // console.log("i18n language 2", i18next.languages);
    // console.log("th abc", t("abc"));
  });
  // i18next.reloadResources("en", "th");
  console.log("th hello", i18next.t("hello"));

  const textNodes = figma.currentPage.findAll(
    (node) => /#t.|_#t./.test(node.name) && node.type == "TEXT"
  );

  textNodes.forEach((textNode) => {
    console.log(textNode.name);
    const names = textNode.name.match(/(_?#t).?([a-zA-Z0-9]*)/);
    if (names) {
      console.log("name 1", names[0]);
      console.log("name 2", names[1]);
    }
  });

  // await Promise.all(
  // console.log("bank");
  // );
}

export default function () {
  setRelaunchButton(figma.currentPage, "figma-i18next", {
    description: "🔍 Update text",
  });

  updateAllTextProperty();

  // updateAllTextProperty().then(() => {
  //   figma.closePlugin("Updated 🎉");
  // });

  figma.closePlugin("Updated 🎉");
}

export { updateAllTextProperty };
