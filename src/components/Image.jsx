import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import useHover from '@react-hook/hover';
import { atoms } from '../state';
import ImageSpinner from './ImageSpinner';

const ImageElement = styled.img`
  min-width: 40%;
  max-width: 100%;
  margin: 0 auto;
  display: block;
  transition: all 500ms ease 0s;
  border: ${props => props.showBorders ? 2 : 0}px solid #444;
  cursor: ${props => props.active ? 'default' : 'pointer'};
  opacity: ${props => props.loading ? 0 : (props.active || props.hovered ? 1 : 0.3)};
`;
const ImageRoot = styled.div`
  position: relative;
  display: flex;
  width: ${props => props.imageWidth}px;
  height: 100%;
  padding: 0 ${props => props.showBorders ? 2 : 0}px;
`;
const Image = ({ id, imageWidth, showBorders }) => {
  const [loading, setLoading] = useState(true);

  const image = useRecoilValue(atoms.imageFamily(id));
  const [activeImageId, setActiveImageId] = useRecoilState(atoms.activeImageId);

  const ref = React.useRef(null);
  const hovered = useHover(ref);

  return (
    <ImageRoot
      imageWidth={imageWidth}
      showBorders={showBorders}
    >
      {loading && <ImageSpinner />}

      <ImageElement
        ref={ref}
        src={image.url}
        loading={loading}
        showBorders={showBorders}
        data-testid="img"
        hovered={hovered}
        active={image.id === activeImageId}
        onLoad={() => setLoading(false)}
        onClick={() => activeImageId !== id && setActiveImageId(image.id)}
      />
    </ImageRoot>
  );
};
export default Image;
