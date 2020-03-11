const chroma = require("chroma-js");

export const colors = chroma.scale(["#767676", "#2185D0"]).colors(100);

export const getStrokeColor = (percentage: number) => {
    let strokeIndex = Math.round(percentage);
    if (strokeIndex === 100) strokeIndex = 99;
    if (strokeIndex < 1) strokeIndex = 1;
    return colors[strokeIndex];
};
