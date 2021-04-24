import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { Gallery } from './components/Gallery';
import { ImageAdder } from './components/ImageAdder';

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ExpandedImageContainer = styled.div`
  position: fixed;
  display: ${({ show }) => (show ? 'grid' : 'none')};
  place-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(46, 49, 49, 0.2); ;
`;

const ExpandedImageWrapper = styled.div`
  position: relative;
  display: flex;
`;

const PreviousButton = styled.button`
  align-self: center;
  margin-right: 2rem;
  cursor: pointer;
`;

const NextButton = styled.button`
  align-self: center;
  margin-left: 2rem;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [expandedImageUrl, setExpandedImageUrl] = useState();

  const onImageUrlSubmitted = (imageUrl) => {
    setImageList((list) => [...new Set([...list, imageUrl])]);
  };

  const handleThumbnailClicked = (imageUrl) => {
    setExpandedImageUrl(imageUrl);
  };

  const handlePreviousButtonClick = () => {
    const currentExpandedImageIndex = imageList.indexOf(expandedImageUrl);
    if (currentExpandedImageIndex - 1 < 0) {
      setExpandedImageUrl(imageList[imageList.length - 1]);
    } else {
      setExpandedImageUrl(imageList[currentExpandedImageIndex - 1]);
    }
  };

  const handleNextButtonClick = () => {
    const currentExpandedImageIndex = imageList.indexOf(expandedImageUrl);
    if (currentExpandedImageIndex + 1 >= imageList.length) {
      setExpandedImageUrl(imageList[0]);
    } else {
      setExpandedImageUrl(imageList[currentExpandedImageIndex + 1]);
    }
  };

  const handleCloseButton = () => {
    setExpandedImageUrl('');
  };

  return (
    <div className="App container">
      <InputContainer>
        <ImageAdder onImageUrlSubmitted={onImageUrlSubmitted} />
      </InputContainer>
      <Gallery
        imageList={imageList}
        onThumbnailClicked={handleThumbnailClicked}
      />
      <ExpandedImageContainer show={!!expandedImageUrl}>
        <ExpandedImageWrapper>
          <CloseButton onClick={handleCloseButton}>{'X'}</CloseButton>
          <PreviousButton onClick={handlePreviousButtonClick}>
            {'<'}
          </PreviousButton>
          <img src={expandedImageUrl} alt="" />
          <NextButton onClick={handleNextButtonClick}>{'>'}</NextButton>
        </ExpandedImageWrapper>
      </ExpandedImageContainer>
    </div>
  );
};

export default App;
