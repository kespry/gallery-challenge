import React from "react";
import styled from "styled-components";
import { GallerySliderContainer } from "./GallerySliderContainer";


const ZoomRoot = styled.div`
  height: 60vh;
`
export const Zoom = () => {
  return (
    <ZoomRoot>
      <GallerySliderContainer visibleCount={1} />
    </ZoomRoot>
  )
}
