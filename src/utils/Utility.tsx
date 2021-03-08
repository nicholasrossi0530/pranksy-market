export const coinSymbolConverter = (symbol: string) => {
    switch(symbol) {
        case "ETH": return "Ξ";
        default: return symbol;
    }
}