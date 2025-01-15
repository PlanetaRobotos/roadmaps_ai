import ColorThief from 'colorthief';

// Default primary colors for gradient
export const DEFAULT_COLORS: RGB[] = [
  { r: 63, g: 81, b: 181 }, // Primary blue
  { r: 103, g: 58, b: 183 }, // Deep purple
  { r: 156, g: 39, b: 176 } // Purple
];

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export const rgbToHex = ({ r, g, b }: RGB): string => {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};

export const extractColors = async (imageUrl: string): Promise<RGB[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const colorThief = new ColorThief();

    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      try {
        const palette = colorThief.getPalette(img, 3);
        const rgbColors = palette.map(([r, g, b]) => ({ r, g, b }));
        resolve(rgbColors);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = imageUrl;
  });
};

export const getRGBA = (rgb: RGB, alpha: number = 1): string => {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

// Helper to determine if a color is light or dark
export const isLightColor = ({ r, g, b }: RGB): boolean => {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

const getLightColor = (color: RGB, opacity: number = 0.3): string => {
  const { r, g, b } = color;
  // Mix with white to ensure it's light
  const lightR = Math.floor(r + (255 - r) * 0.7);
  const lightG = Math.floor(g + (255 - g) * 0.7);
  const lightB = Math.floor(b + (255 - b) * 0.7);
  return `rgba(${lightR}, ${lightG}, ${lightB}, ${opacity})`;
};
