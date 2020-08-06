import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ImageSpinnerRoot = styled.div`
  position: absolute;
  color: #444;
  width: 100%;
  text-align: center;
  align-self: center;
`;
const ImageSpinner = () => (
  <ImageSpinnerRoot>
    <FontAwesomeIcon spin icon={faSpinner} />
  </ImageSpinnerRoot>
);
export default ImageSpinner;
