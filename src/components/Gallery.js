import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styled, { css } from 'styled-components'
import urlRegex from 'url-regex'
import { atom, atomFamily, selector, useRecoilCallback, useRecoilValue } from "recoil";
import { useRecoilState } from "recoil/dist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// styled.div = {};

const emptyImage = {
  id: uuidv4(),
  url: 'https://i.imgur.com/hUkwowL.png'
}
const atoms = {
  imageIds: atom({
    key: 'atom/imageIds',
    default: []
  }),
  activeImageId: atom({
    key: 'atom/activeImageId',
    default: emptyImage.id
  }),
  imageFamily: atomFamily({
    key: 'atomFamily/image',
    default: _id => emptyImage
  })
}
const selectors = {
  imageIds: selector({
    key: 'selector/imageIds',
    get: ({ get }) => {
      const imageIds = get(atoms.imageIds);
      if (imageIds.length > 0) {
        return imageIds;
      } else {
        return [emptyImage.id];
      }
    }
  })
}

const InsertInput = styled.input`
  display: inherit;
`
export const Input = () => {
  const [url, setUrl] = useState('')

  const addUrl = useRecoilCallback(({ snapshot, set }) => async url => {
    const image = {
      id: uuidv4(),
      url
    }

    set(atoms.imageFamily(image.id), image);

    const imageIds = await snapshot.getPromise(atoms.imageIds);
    set(atoms.imageIds, [...imageIds, image.id]);

    if (imageIds.length === 0) {
      set(atoms.activeImageId, image.id);
    }
  });

  return (
    <InsertInput
      placeholder="Insert a new image entering the URL..."
      type="search"
      autoComplete="off"
      value={url}
      onChange={({ currentTarget }) => {
        setUrl(currentTarget.value)
      }}
      onKeyUp={({ key }) => {
        if (key === 'Enter') {
          if (urlRegex().test(url)) {
            addUrl(url);
            setUrl('');
          }
        }
      }}
    />
  )
}

const ImageContainer = styled.div`
  background-color: #333;
`
const ImageEl = styled.img`
    width: 100px;

    ${props => props.active
  ? css`
      border: 1px solid #0f0;
    `
  : css`
      cursor: pointer;
    `}
`
export const Image = ({ id }) => {
  const image = useRecoilValue(atoms.imageFamily(id));
  const [activeImageId, setActiveImageId] = useRecoilState(atoms.activeImageId);

  const onImageClick = () => {
    if (activeImageId !== id) {
      setActiveImageId(image.id);
    }
  }

  return (
    <ImageContainer>
      <span>{JSON.stringify(image)}</span>
      <ImageEl
        src={image.url}
        active={image.id === activeImageId}
        alt=''
        onClick={onImageClick} />
    </ImageContainer>
  )
}

const NavigationButtonContainer = styled.div`
  cursor: pointer;
  position: absolute;
  ${props => props.direction}: 0;
  display: ${props => props.visible ? 'block' : 'none'};
  top: 0;
  height: 100%;
  width: 50px;
  background-color: #ff0000aa;
`
export const NavigationButton = ({ direction }) => {
  const imageIds = useRecoilValue(selectors.imageIds);

  const onClick = useRecoilCallback(({ snapshot, set }) => async () => {
    const activeImageId = await snapshot.getPromise(atoms.activeImageId);

    const activeImageIndex = imageIds.indexOf(activeImageId);

    let newIndex = activeImageIndex + (direction === 'left' ? -1 : 1);
    if (newIndex === -1) {
      newIndex = imageIds.length - 1;
    } else if (newIndex === imageIds.length) {
      newIndex = 0;
    }

    if (newIndex !== activeImageIndex) {
      const newActiveImageId = imageIds[newIndex];
      set(atoms.activeImageId, newActiveImageId);
    }
  }, [imageIds])

  return (
    <NavigationButtonContainer
      direction={direction}
      visible={imageIds.length > 1}
      onClick={onClick}>
      <FontAwesomeIcon icon={direction === 'left' ? faArrowLeft : faArrowRight} />
    </NavigationButtonContainer>
  )
}

const GallerySliderImagesContainer = styled.div`
  display: flex;
`
const GallerySliderContainer = styled.div`
  position: relative;
  background-color: #333;
`
export const GallerySlider = ({ visibleCount }) => {
  const imageIds = useRecoilValue(selectors.imageIds);

  return (
    <GallerySliderContainer>
      <NavigationButton direction={'left'} />

      <GallerySliderImagesContainer>
        <span>Visible count: {visibleCount}</span>
        {imageIds.map((id, i) => <Image key={i} id={id} />)}
      </GallerySliderImagesContainer>

      <NavigationButton direction={'right'} />
    </GallerySliderContainer>
  )
}

export const Thumbnails = () => {
  return (
    <GallerySlider visibleCount={4} />
  )
}

export const CurrentImage = () => {
  return (
    <GallerySlider visibleCount={1} />
  )
}

const GalleryContainer = styled.div`
  background-color: #666;
  width: 800px;
`
export const Gallery = () => {
  return (
    <GalleryContainer>
      <Input />
      <Thumbnails />
      <CurrentImage />
    </GalleryContainer>
  )
}
