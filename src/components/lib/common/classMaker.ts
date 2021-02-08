export const classMaker = (moduleName) => (block, element, modifier) =>
  moduleName +
  (block ? "-" + block : "") +
  (element ? "__" + element : "") +
  (modifier ? "--" + modifier : "");
