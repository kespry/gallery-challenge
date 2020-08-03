// @flow

import React, { useState } from "react";

import "./styles.scss";

type Props = {
  addImage: Function,
};

// TODO
// should check that input is a valid URL
// also check if URL was already entered so gallery won't have repeated images

/**
 * @function ImageInput
 * @param {Object} props
 * @returns {React.Node}
 * @exports ImageInput
 */

const ImageInput = (props: Props) => {
  const { addImage } = props;
  const [url, setUrl] = useState("");
  return (
    <div className="ImageInput">
      <input
        placeholder="Enter image URL"
        onChange={(e) => setUrl(e.target.value)}
      ></input>
      <div
        className={url ? "ImageInput__button" : "ImageInput__button--disabled"}
        onClick={() => addImage(url)}
      >
        Add Image
      </div>
    </div>
  );
};

export default ImageInput;
