export async function loadFont(text: TextNode) {
  const font = <FontName>text.fontName;
  await figma.loadFontAsync({ family: font.family, style: font.style });
}
