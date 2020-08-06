import React, { useEffect } from 'react';
import styled from 'styled-components';
import { testData, useAddImagesCallback } from '../state';
import Input from './Input';
import Zoom from './Zoom';
import Thumbnails from './Thumbnails';

const GalleryRoot = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0px 17px 22px rgba(0, 0, 0, 0.4);
`;
const Gallery = ({ autoLoadTestData }) => {
  const addImages = useAddImagesCallback();

  useEffect(() => {
    if (autoLoadTestData) {
      addImages(testData);
    }
  }, [autoLoadTestData, addImages]);

  return (
    <GalleryRoot>
      <Input />
      <Thumbnails />
      <Zoom />
    </GalleryRoot>
  );
};
export default Gallery;
