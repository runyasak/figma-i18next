import { once, showUI } from "@create-figma-plugin/utilities";
import { CloseHandler, CreateRectanglesHandler } from "./types";
import i18next from "i18next";

export default function () {
  const tEn = figma.currentPage.findAll((node) => /##t.en/.test(node.name));
  const tEnJson = (<TextNode>tEn[0]).characters;

  // const xEn = '{"translation":{"key":"hello world"}}';

  // console.log('tEN',tEnJson)
  const tEnJsonObject = JSON.parse(`{ ${tEnJson} }`);
  // console.log('tEN Object',tEnJsonObject)

  const resources = {
    en: tEnJsonObject,
  };

  console.log("resources", resources);

  i18next.init({
    lng: "en", // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: tEnJsonObject,
      },
    },
  });

  console.log("i18n R", i18next);
  console.log("i18n", i18next.t("key"));

  // console.log("tEN 0 name", (<TextNode>tEN[0]).name);
  // console.log("tEN 0 chars", (<TextNode>tEN[0]).characters);

  once<CreateRectanglesHandler>("CREATE_RECTANGLES", function (count: number) {
    const nodes: Array<SceneNode> = [];
    for (let i = 0; i < count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [
        {
          type: "SOLID",
          color: { r: 1, g: 0.5, b: 0 },
        },
      ];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.closePlugin();
  });

  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  showUI({
    width: 240,
    height: 137,
  });
}
