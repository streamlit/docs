// Manually traverse the unist syntax tree recursively
function traverse(node, visitor) {
  if (typeof node !== "object" || node === null) return;

  visitor(node);

  if (node.children && Array.isArray(node.children)) {
    for (let i = 0; i < node.children.length; i++) {
      traverse(node.children[i], visitor);
    }
  }
}

function withLineNumbers() {
  return (tree) => {
    const visitor = (node) => {
      if (node.type === "code") {
        const lang = node.lang || "";
        if (lang.includes("lineNumbers")) {
          node.lineNumbers = true;
          node.lang = lang.replace("lineNumbers", "").trim();
        }
      }
    };
    traverse(tree, visitor);
  };
}

module.exports = withLineNumbers;
