import React from 'react';
import styled from 'styled-components';
import GallerySliderContainer from './GallerySliderContainer';

const ThumbnailsRoot = styled.div`
  height: 10vh;
  margin: 15px 0;
`;
const Thumbnails = () => (
  <ThumbnailsRoot>
    <GallerySliderContainer visibleCount={7} />
  </ThumbnailsRoot>
);
export default Thumbnails;
