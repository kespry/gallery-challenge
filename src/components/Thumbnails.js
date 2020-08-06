import React from "react";
import styled from "styled-components";
import { GallerySliderContainer } from "./GallerySliderContainer";


const ThumbnailsRoot = styled.div`
  height: 15vh;
  margin: 10px 0;
`
export const Thumbnails = () => {
  return (
    <ThumbnailsRoot>
      <GallerySliderContainer visibleCount={7} />
    </ThumbnailsRoot>
  )
}
