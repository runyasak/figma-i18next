export interface TText {
  type: string;
  debug(): any;
}

export class TText implements TText {
  node: TextNode;
  key: string = "";
  type: string = "";
  language: string = "";

  constructor(node: TextNode) {
    this.node = node;
    this.key = this.matchKey();
    this.language = this.matchReferenceLanguage();
  }

  matchKey(): string {
    let searchKeys = this.node.name.match(/_?#t.?([a-zA-Z0-9.]*)/);
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
