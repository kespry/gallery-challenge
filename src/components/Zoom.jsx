import React from 'react';
import styled from 'styled-components';
import GallerySliderContainer from './GallerySliderContainer';

const ZoomRoot = styled.div`
  height: 60vh;
`;
const Zoom = () => (
  <ZoomRoot>
    <GallerySliderContainer visibleCount={1} />
  </ZoomRoot>
);
export default Zoom;
