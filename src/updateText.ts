import { setRelaunchButton } from "@create-figma-plugin/utilities";
import { initLanguageStorage } from "./utility/languageStorage";
import { i18nInit } from "./utility/i18nUtility";
import { updateAllTextProperty } from "./utility/textNodeUtility";

const updateAll = async () => {
  setRelaunchButton(figma.currentPage, "figma-i18next", {
    description: "🔍 Update text",
  });

  await initLanguageStorage();
  await i18nInit();
  await updateAllTextProperty();
  await figma.closePlugin("Updated 🎉");
};

export default updateAll;

export { updateAllTextProperty };
