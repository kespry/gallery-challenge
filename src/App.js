// @flow

import React, { useState } from "react";

import { Header, ImageBrowser, ImageInput, ImageViewer } from "./components";

import { getImageIndex } from "./utils";

const App = () => {
  const [images, addImage] = useState([]);
  const [activeImage, setActiveImage] = useState(images[0]);
  return (
    <div className="App">
      <Header>
        <ImageInput
          addImage={(image) => {
            addImage(images.concat(image));
            setActiveImage(image);
          }}
        />
      </Header>
      <main>
        <ImageBrowser
          activeImage={activeImage}
          images={images}
          selectImage={(image) => setActiveImage(image)}
        />
        <ImageViewer
          activeImage={activeImage}
          nextImage={() => {
            setActiveImage(images[getImageIndex(activeImage, images, "next")]);
          }}
          prevImage={() => {
            setActiveImage(images[getImageIndex(activeImage, images, "prev")]);
          }}
        />
      </main>
    </div>
  );
};

export default App;
