// @flow

import getImageIndex from "../getImageIndex";

const IMAGES = ["image_01", "image_02", "image_03", "image_04"];

describe("getImageIndex()", () => {
  test("returns the next image", () => {
    expect(getImageIndex(IMAGES[0], IMAGES, "next")).toEqual(1);
  });
  test("loops to first image", () => {
    expect(getImageIndex(IMAGES[3], IMAGES, "next")).toEqual(0);
  });
  test("returns the previous image", () => {
    expect(getImageIndex(IMAGES[3], IMAGES, "prev")).toEqual(2);
  });
  test("loops to last image", () => {
    expect(getImageIndex(IMAGES[0], IMAGES, "prev")).toEqual(3);
  });
});
