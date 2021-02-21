export const rgb2hex = (color) => {
  let rgb = color.split(",");
  let r = parseInt(rgb[0].split("(")[1]);
  let g = parseInt(rgb[1]);
  let b = parseInt(rgb[2].split(")")[0]);

  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
};

export const hex2rgb = (color) => {
  let hex = color.replace(/ |#/g, "");
  if (hex.length === 3) hex = hex.replace(/(.)/g, "$1$1");

  hex = hex.match(/../g);
  return `rgb(${[
    parseInt(hex[0], 16),
    parseInt(hex[1], 16),
    parseInt(hex[2], 16),
  ].join(",")})`;
};

export const rgb2hsl = (color) => {
  let rgb = color.split(",");
  let r = parseInt(rgb[0].split("(")[1]);
  let g = parseInt(rgb[1]);
  let b = parseInt(rgb[2].split(")")[0]);

  r = r / 255;
  g = g / 255;
  b = b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h, s, l;

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / delta) % 6;
  } else if (max === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;

  (l = (max + min) / 2),
    (s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)));

  // 切换为百分比模式
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
};
