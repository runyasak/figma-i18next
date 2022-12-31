import { once, showUI } from "@create-figma-plugin/utilities";
import { CloseHandler, CreateRectanglesHandler } from "./types";
import i18next from "i18next";

export default function () {
  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  showUI({
    width: 340,
    height: 500,
  });

  figma.ui.onmessage = (message, payload: any) => {
    console.log("Plugin got Message:", message);
  };
}
