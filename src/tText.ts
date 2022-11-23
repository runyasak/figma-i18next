export interface TText {
  node: TextNode;
  type: string;
  language: string;
  key: string;
  debug(): any;
}

export class TText implements TText {
  constructor(node: TextNode) {
    this.type = "TText";
    this.node = node;
    this.key = this.matchKey();
    this.language = this.matchReferenceLanguage();
  }

  matchKey(): string {
    let searchKeys = this.node.name.match(/_?#t.?([a-zA-Z0-9.]*)/);
    console.log("searchKeys", searchKeys);
    return searchKeys ? searchKeys[1] : "";
  }

  matchReferenceLanguage(): string {
    let currentNode: BaseNode | PageNode | SceneNode = this.node;
    while (currentNode.parent) {
      const language = currentNode.name.match(/(?<=#\[)([a-zA-Z-]*)(?=\])/);
      if (language) {
        return language[0];
      } else {
        currentNode = currentNode.parent;
      }
    }
    return "";
  }
}
