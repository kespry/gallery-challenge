import React, { useEffect } from "react";
import styled from "styled-components";
import { testData, useAddImagesCallback } from "../state";
import { Input } from "./Input";
import { Thumbnails } from "./Thumbnails";
import { Zoom } from "./Zoom";


const GalleryRoot = styled.div`
  background-color: #666;
  width: 100%;
  height: 100%;
`
export const Gallery = ({ autoLoadTestData }) => {
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
  )
}
