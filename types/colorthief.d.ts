declare module 'colorthief' {
  export default class ColorThief {
    /**
     * Get the dominant color from an image.
     * @param img HTML image element
     * @param quality Optional. 1 is the highest quality settings. 10 is the default. There is a trade-off between quality and speed.
     * @returns [r: number, g: number, b: number]
     */
    getColor(img: HTMLImageElement, quality?: number): [number, number, number];

    /**
     * Get a color palette from an image.
     * @param img HTML image element
     * @param colorCount The maximum number of colors to return
     * @param quality Optional. 1 is the highest quality settings. 10 is the default.
     * @returns Array of [r: number, g: number, b: number]
     */
    getPalette(
      img: HTMLImageElement,
      colorCount: number,
      quality?: number
    ): Array<[number, number, number]>;
  }
}
