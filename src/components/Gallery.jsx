import React from 'react';
import styled, { css } from 'styled-components';

const GalleryWrapper = styled.section`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, 10rem);
`;

const removeDefaultButtonStyles = css`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  margin: 0;
  padding: 0;
  text-align: initial;
`;

const ImageThumbnail = styled.button`
  ${removeDefaultButtonStyles}
`;

export const Gallery = ({ imageList, onThumbnailClicked }) => {
  return (
    <GalleryWrapper>
      {imageList.map((imageUrl, index) => (
        <ImageThumbnail
          key={index}
          onClick={() => {
            onThumbnailClicked(imageUrl);
          }}
        >
          <img src={imageUrl} alt="" />
        </ImageThumbnail>
      ))}
    </GalleryWrapper>
  );
};
