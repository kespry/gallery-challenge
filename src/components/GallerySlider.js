import styled from "styled-components";
import { atoms, selectors } from "../state";
import { useRecoilValue } from "recoil";
import React from "react";
import { Image } from "./Image";


const GallerySliderRoot = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: ${props => -(props['data-first-visible'] * props.imageWidth)}px;
  right: auto;
  top: auto;
  transition: all 500ms ease 0s;
`
export const GallerySlider = ({ visibleCount, imageWidth }) => {
  const imageIds = useRecoilValue(atoms.imageIds);
  const activeImageIndex = useRecoilValue(selectors.activeImageIndex);

  const centerAlignment = Math.round(visibleCount / 2);
  const maxFirstVisible = imageIds.length - visibleCount;
  const firstVisibleStart = Math.max(0, activeImageIndex - centerAlignment + 1);
  const firstVisibleEnd = Math.min(activeImageIndex, maxFirstVisible);
  const firstVisible = Math.min(firstVisibleStart, firstVisibleEnd);

  return (
    <GallerySliderRoot
      data-testid="slider"
      data-first-visible={firstVisible}
      imageWidth={imageWidth}>

      {imageIds.map(id =>
        <Image
          id={id}
          key={id}
          width={imageWidth} />
      )}
    </GallerySliderRoot>
  )
}
