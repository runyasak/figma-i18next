import { setRelaunchButton } from "@create-figma-plugin/utilities";
import i18next from "i18next";

function updateAllTextProperty() {
  const tEn = figma.currentPage.findAll((node) => /##t.en/.test(node.name));
  const tEnJson = (<TextNode>tEn[0]).characters;
  const tEnJsonObject = JSON.parse(`{ ${tEnJson} }`);

  i18next.init({
    lng: "en", // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: tEnJsonObject,
      },
    },
  });

  const textNodes = figma.currentPage.findAll((node) => /#|_#/.test(node.name));

  textNodes.forEach((textNode) => {
    console.log(textNode.name);
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
