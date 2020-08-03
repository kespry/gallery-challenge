// @flow

import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";

type Props = {
  activeImage: string,
  nextImage: Function,
  prevImage: Function,
};

/**
 * @function ImageViewer
 * @param {Object} props
 * @returns {React.Node}
 * @exports ImageViewer
 */

// TODO
// would be nice to have some transitions when switching images

const ImageViewer = (props: Props) => {
  const { activeImage, nextImage, prevImage } = props;

  if (!activeImage) {
    return null;
  }

  return (
    <div className="ImageViewer">
      <div className="ImageViewer__arrow--left" onClick={() => prevImage()}>
        <FontAwesomeIcon color="#fff" icon={faAngleLeft} size="2x" />
      </div>
      <div className="ImageViewer__image">
        <img alt="" src={activeImage} />
      </div>
      <div className="ImageViewer__arrow--right" onClick={() => nextImage()}>
        <FontAwesomeIcon color="#fff" icon={faAngleRight} size="2x" />
      </div>
    </div>
  );
};

export default ImageViewer;
