const hexToRgb = (hex: string) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const hexInverseBw = (hex: string) => {
  let rgb = hexToRgb(hex);
  let luminance = rgb
    ? 0.2126 * rgb["r"] + 0.7152 * rgb["g"] + 0.0722 * rgb["b"]
    : 255;
  return luminance < 140 ? "#ffffff" : "#000000";
};

export default hexInverseBw;
