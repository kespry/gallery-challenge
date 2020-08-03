// @flow

import * as React from "react";

import "./styles.scss";

type Props = {
  activeImage: string,
  images: Array<string>,
  selectImage: Function,
};

/**
 * @function ImageBrowser
 * @param {Object} props
 * @returns {React.Node}
 * @exports ImageBrowser
 */

// TODO
// should also allow users to remove an image from thumbnail list

const ImageBrowser = (props: Props) => {
  const { activeImage, images, selectImage } = props;

  // placeholder
  if (!images.length) {
    return (
      <div className="ImageBrowser">
        <p>
          Use the input above to add images to the gallery by entering their
          URL.
        </p>
      </div>
    );
  }

  return (
    <div className="ImageBrowser">
      {images.map((image, i) => (
        <img
          alt=""
          className={
            activeImage === image
              ? "ImageBrowser__image--active"
              : "ImageBrowser__image"
          }
          key={i}
          src={image}
          onClick={() => selectImage(image)}
        />
      ))}
    </div>
  );
};

export default ImageBrowser;
