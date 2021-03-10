import { ITrait, ILooseObject } from "../interfaces/Interfaces";

export const coinSymbolConverter = (symbol: string) => {
  switch (symbol) {
    case "ETH":
      return "Ξ";
    default:
      return symbol;
  }
};

export const removeEdition = (name: string) => {
  return name ? name.replace(/( #)\d+/g, "") : "";
};

const TRAIT_TYPES = ["series", "file type", "artist name", "box name", "theme"];

export const getSearchTraits = (traits: ITrait[]) => {
  const results = [];
  if (traits.length > 0) {
    for (const trait of traits) {
      if (TRAIT_TYPES.includes(trait.trait_type)) {
        const result: ILooseObject = {};
        result.name = trait.trait_type;
        result.values = [trait.value];
        results.push(result);
      }
    }
  }
  return results;
};
