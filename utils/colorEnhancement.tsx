// ---- color utils: hex/rgb/hsl -> HSL, adjust, back to hsl() ----
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

function parseColorToHsl(input: string) {
  input = input.trim();
  // #rgb / #rrggbb
  if (input.startsWith("#")) {
    const hex = input.slice(1);
    const v =
      hex.length === 3
        ? hex.split("").map((c) => parseInt(c + c, 16))
        : [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((x) =>
            parseInt(x, 16)
          );
    const [r, g, b] = v.map((x) => x / 255);
    return rgbToHsl(r, g, b);
  }
  // rgb(...)
  if (input.startsWith("rgb")) {
    const [r, g, b] = input
      .match(/[\d.]+/g)!
      .slice(0, 3)
      .map((n) => parseFloat(n) / 255);
    return rgbToHsl(r, g, b);
  }
  // hsl(...)
  if (input.startsWith("hsl")) {
    const [h, s, l] = input
      .match(/[\d.]+/g)!
      .slice(0, 3)
      .map(Number);
    return { h, s: s / 100, l: l / 100 };
  }
  // fallback: purple
  return { h: 270, s: 0.7, l: 0.5 };
}

function rgbToHsl(r: number, g: number, b: number) {
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h, s, l };
}

const hslString = (h: number, s: number, l: number) =>
  `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;

/** Make pale colors (esp. yellows) usable on light UIs */
export function normalizeTint(input: string) {
  let { h, s, l } = parseColorToHsl(input);

  // 1) lift saturation to at least 0.6 (stronger floor for yellows)
  const satFloor = h >= 40 && h <= 75 ? 0.7 : 0.6;
  s = Math.max(s, satFloor);

  // 2) pull lightness down if too bright (yellows often ~0.75–0.9)
  const lightCap = h >= 40 && h <= 75 ? 0.55 : 0.6; // yellows slightly darker
  l = Math.min(l, lightCap);

  // 3) return CSS color
  return hslString(h, clamp(s), clamp(l));
}

/** Suggest stronger mix % for very light colors */
export function mixPercentForBg(input: string) {
  const { h, s, l } = parseColorToHsl(input);
  const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

  const isYellow = h >= 40 && h <= 75;

  // stronger baseline + higher ceiling
  const base = isYellow ? 0.1 : 0.08; // was 0.06
  const max = isYellow ? 0.26 : 0.18; // was 0.14/0.12

  // lightness-driven boost (ease-out so very light colors ramp quickly)
  const t = clamp((l - 0.5) / 0.5); // 0 @ l<=0.5, 1 @ l>=1
  const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic

  // extra help for low-sat colors (washed-out)
  const satBoost = s < 0.35 ? 0.06 * (1 - s / 0.35) : 0;

  const val = clamp(base + (max - base) * eased + satBoost, base, max);
  return `${Math.round(val * 100)}%`;
}
