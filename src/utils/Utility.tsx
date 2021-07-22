import { useEffect, useState } from "react";
import { ITrait, ILooseObject } from "../interfaces/Interfaces";

export const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
};

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
export const MAR_BOX_ADDRESS = "0xf876bBc810E84854C9C37018103C0045544a6Af9";
export const APRIL_BOX_ADDRESS = "0xf876bBc810E84854C9C37018103C0045544a6Af9";
export const MAY_BOX_ADDRESS = "0x70732c08fb6dbb06a64bf619c816c22aed12267a";
export const JUNE_BOX_ADDRESS = "0x70732c08fb6dbb06a64bf619c816c22aed12267a";
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

const MARCH_BOX_ART = [
  {
    name: "The Reinitialization Of Sei",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/8007",
    tokenId: "8007"
  },
  {
    name: "The 100 Years Key",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/8008",
    tokenId: "8008"
  },
  {
    name: "Just i",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/8001",
    tokenId: "8001"
  },
  {
    name: "Completely Tapped In",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/8002",
    tokenId: "8002"
  },
  {
    name: "Humanity is a threat to AI",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/8003",
    tokenId: "8003"
  },
  {
    name: "Lady Robot",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/8004",
    tokenId: "8004"
  },
  {
    name: "THE SINGULARITY RESISTANCE",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/8005",
    tokenId: "8005"
  },
  {
    name: "Tribute to Ides Noires",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/8006",
    tokenId: "8006"
  },
  {
    name: "Concept Cat Year One",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/8009",
    tokenId: "8009"
  }
];

const APRIL_BOX_ART = [
  {
    name: "SAINT_LESS (Fire)",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/14301",
    tokenId: "14301"
  },
  {
    name: "SAINT_LESS (Control)",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/15901",
    tokenId: "15901"
  },
  {
    name: "SAINT_LESS (Waves)",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/17501",
    tokenId: "17501"
  },
  {
    name: "The Covenant",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/14302",
    tokenId: "14302"
  },
  {
    name: "Winging It",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/14303",
    tokenId: "14303"
  },
  {
    name: "Church of crypto",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/14304",
    tokenId: "14304"
  },
  {
    name: "Sleepless' Drink",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/14305",
    tokenId: "14305"
  },
  {
    name: "Introductory video to the cult",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/14306",
    tokenId: "14306"
  },
  {
    name: "ULTRACULT",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/14307",
    tokenId: "14307"
  },
  {
    name: "Schemes Key",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/14308",
    tokenId: "14308"
  },
];

const MAY_BOX_ART = [
  {
    name: "Rot",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/19101",
    tokenId: "19101"
  },
  {
    name: "FRACTAL CONCEPTION",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/19102",
    tokenId: "19102"
  },
  {
    name: "Sacred Passage",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/19103",
    tokenId: "19103"
  },
  {
    name: "|({- |_/-|{{- |/||_|_{-",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/19104",
    tokenId: "19104"
  },
  {
    name: "As We Are",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/19105",
    tokenId: "19105"
  },
  {
    name: "Amalgamations of a Queer Girl with Face Tattoos",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/19106",
    tokenId: "19106"
  },
  {
    name: "inReflection",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/19107",
    tokenId: "19107"
  },
  {
    name: "Concept Cat Year Two",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/19108",
    tokenId: "19108"
  },
  {
    name: "Reflective Key",
    url: "https://opensea.io/assets/0x6d4530149e5b4483d2f7e60449c02570531a0751/19109",
    tokenId: "19109"
  }
];

const boxes: ILooseObject = {
  "genesis": JANUARY_BOX_ART,
  "grow": FEBRUARY_BOX_ART,
  "100-years-from-now": MARCH_BOX_ART,
  "schemes": APRIL_BOX_ART,
  "reflective": MAY_BOX_ART
};

export const paramToContract = (param: string) => {
  switch(param) {
    case "genesis": return JAN_BOX_ADDRESS;
    case "grow": return FEB_BOX_ADDRESS;
    case "100-years-from-now": return MAR_BOX_ADDRESS;
    case "schemes": return APRIL_BOX_ADDRESS;
    case "reflective": return MAY_BOX_ADDRESS;
    case "hollywood-pixelations": return MAY_BOX_ADDRESS;
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

