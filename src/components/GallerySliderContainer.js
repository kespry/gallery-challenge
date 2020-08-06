import React from "react";
import styled from "styled-components";
import useDimensions from "react-use-dimensions";
import { NavigationButton } from "./NavigationButton";
import { GallerySlider } from "./GallerySlider";


const GallerySliderContainerRoot = styled.div`
  background-color: #333;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`
export const GallerySliderContainer = ({ visibleCount }) => {
  const [ref, { width }] = useDimensions();

  const imageWidth = (width || 0) / visibleCount;

  return (
    <GallerySliderContainerRoot ref={ref}>
      <NavigationButton direction={'left'} />

      <GallerySlider
        visibleCount={visibleCount}
        imageWidth={imageWidth} />

      <NavigationButton direction={'right'} />
    </GallerySliderContainerRoot>
  )
}
