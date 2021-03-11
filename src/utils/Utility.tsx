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

export const JAN_BOX_ADDRESS = "0x5F8061F9d6A2Bb4688F46491cCA7658e214E2Cb6";
export const FEB_BOX_ADDRESS = "0x067ab2FbdBED63401aF802d1DD786E6D83b0ff1B";
export const ART_ADDRESS = "0x6d4530149e5B4483d2F7E60449C02570531A0751";
const JANUARY_BOX_ART = [
  {
    name: "Trust Your Intuition",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/1",
    tokenId: "1"
  },
  {
    name: "SCARLET TOTER",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/2",
    tokenId: "2"
  },
  {
    name: "Xerox",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/3",
    tokenId: "3"
  },
  {
    name: "Innova",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/4",
    tokenId: "4"
  },
  {
    name: "Dancing Daphne",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/5",
    tokenId: "5"
  },
  {
    name: "Dead Drop",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/6",
    tokenId: "6"
  },
  {
    name: "The Great Inventors",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/7",
    tokenId: "7"
  },
  {
    name: "The Genesis Badge",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/8",
    tokenId: "8"
  },
  {
    name: "The Innovators Key",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/9",
    tokenId: "9"
  },
  {
    name: "Neon District Air Drop",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/10",
    tokenId: "10"
  }
];

const FEBRUARY_BOX_ART = [
  {
    name: "Growing Again",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/5001",
    tokenId: "5001"
  },
  {
    name: "Eternal Growth",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/5002",
    tokenId: "5002"
  },
  {
    name: "LIFE IS AN ENDLESS UNFOLDMENT",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/5003",
    tokenId: "5003"
  },
  {
    name: "Bearz Grow",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/5004",
    tokenId: "5004"
  },
  {
    name: "Make it grow",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/5005",
    tokenId: "5005"
  },
  {
    name: "The Grow Key",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/5006",
    tokenId: "5006"
  }
];

const boxes: ILooseObject = {
  "genesis": JANUARY_BOX_ART,
  "grow": FEBRUARY_BOX_ART
};

export const paramToContract = (param: string) => {
  switch(param) {
    case "genesis": return JAN_BOX_ADDRESS;
    case "grow": return FEB_BOX_ADDRESS;
    default: return ""
  }
};

export const getTokenIds = (box: string) => {
  let result = "";
  const monthBox = boxes[box];

  if (monthBox) {
    boxes[box].forEach((item: ILooseObject) => {
      const tokenId = `token_ids=${item.tokenId}`;
      result += result.length <= 0 ? `?${tokenId}` : `&${tokenId}`;
    });
  }
  
  return result;
};

