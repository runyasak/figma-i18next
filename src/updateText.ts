import { setRelaunchButton } from "@create-figma-plugin/utilities";
import i18next from 'i18next';

export default function () {
  setRelaunchButton(figma.currentPage, "figma-i18next", {
    description: "🔍 Update text",
  });

  const tEN = figma.currentPage.findAll((node)=> /##t.en/.test(node.name));
  const tEnResource = (<TextNode>tEN[0]).characters;
  // const tEnResourceObject = JSON.parse(tEnResource);

  // console.log('tEn', tEnResourceObject);

  // i18next.init({
  //   compatibilityJSON: 'v3',
  //   lng: 'en',
  //   debug: true,
  //   resources: {
  //     en: tEnResourceObject
  //   }
  // });

  // console.log('i18n', i18next);

  // console.log("i18n", i18next.t('key'));

  figma.closePlugin("Updated 🎉");
}