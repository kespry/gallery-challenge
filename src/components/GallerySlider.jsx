import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import React from 'react';
import { atoms, selectors } from '../state';
import Image from './Image';

const GallerySliderRoot = styled.div`
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  left: ${props => -(props['data-first-visible'] * props.imageWidth)}px;
  
  right: auto;
  top: auto;
  transition: all 500ms ease 0s;
`;
const GallerySlider = ({ visibleCount, imageWidth }) => {
  const imageIds = useRecoilValue(atoms.imageIds);
  const activeImageIndex = useRecoilValue(selectors.activeImageIndex);

  const centerAlignment = Math.round(visibleCount / 2);
  const firstVisibleStart = activeImageIndex - centerAlignment + 1;
  const maxFirstVisible = imageIds.length - visibleCount;
  const firstVisibleEnd = Math.min(activeImageIndex, maxFirstVisible);
  const firstVisible = Math.max(0, Math.min(firstVisibleStart, firstVisibleEnd));

  return (
    <GallerySliderRoot
      data-testid="slider"
      data-first-visible={firstVisible}
      imageWidth={imageWidth}
    >
      {imageIds.map(id => (
        <Image
          showBorders={visibleCount > 1}
          id={id}
          key={id}
          imageWidth={imageWidth}
        />
      ))}
    </GallerySliderRoot>
  );
};
export default GallerySlider;
