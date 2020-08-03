// @flow

/**
 * @function getImageIndex
 * @summary Returns the index of the next or previous image based on IMAGE and ARRAY.
 * @param {string} IMAGE
 * @param {Array<string>} ARRAY
 * @param {number} POSITION
 */

const getImageIndex = (
  IMAGE: string,
  ARRAY: Array<string>,
  POSITION: number
) => {
  const INDEX = ARRAY.findIndex((image) => image === IMAGE);
  const LAST_INDEX = ARRAY.length - 1;

  switch (POSITION) {
    case "next":
      return INDEX === LAST_INDEX ? 0 : INDEX + 1;
    case "prev":
      return INDEX === 0 ? LAST_INDEX : INDEX - 1;
    default:
    // no default
  }
};

export default getImageIndex;
