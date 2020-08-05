import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styled, { css, keyframes } from 'styled-components'
import urlRegex from 'url-regex'
import { atom, atomFamily, useRecoilCallback, useRecoilValue } from "recoil";
import { useRecoilState } from "recoil/dist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';

styled.div = styled.div || {};

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
    default: null
  }),
  imageFamily: atomFamily({
    key: 'atomFamily/image',
    default: _id => null
  })
}

const useAddImageCallback = () => useRecoilCallback(({ snapshot, set }) => async image => {
  set(atoms.imageFamily(image.id), image);

  const imageIds = await snapshot.getPromise(atoms.imageIds);
  if (imageIds.length === 0 || imageIds.find(id => id === emptyImage.id)) {
    set(atoms.imageIds, [image.id]);
    set(atoms.activeImageId, image.id);
  } else {
    set(atoms.imageIds, [...imageIds, image.id]);
  }
});

const InputRoot = styled.input`
  display: inherit;
`
export const Input = () => {
  const [url, setUrl] = useState('')

  const addImage = useAddImageCallback();

  return (
    <InputRoot
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
            addImage({
              id: uuidv4(),
              url
            });
            setUrl('');
          }
        }
      }}
    />
  )
}

const ImageRoot = styled.img`
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
  const [loading, setLoading] = useState(true)

  const image = useRecoilValue(atoms.imageFamily(id));
  const [activeImageId, setActiveImageId] = useRecoilState(atoms.activeImageId);

  const onImageClick = () => {
    if (activeImageId !== id) {
      setActiveImageId(image.id);
    }
  }

  const onImageLoaded = () => {
    setLoading(false);
  }

  return (
    <div>
      {loading && <div style={{width: '100%', height: '100%'}}><FontAwesomeIcon spin={true} icon={faSpinner} /></div>}
      <ImageRoot
        src={image.url}
        active={image.id === activeImageId}
        alt={JSON.stringify(image)}
        onLoad={onImageLoaded}
        onClick={onImageClick} />
    </div>
  )
}

const NavigationButtonRoot = styled.div`
  cursor: pointer;
  position: absolute;
  text-align: center;
  ${props => props.direction}: 0;
  display: ${props => props.visible ? 'block' : 'none'};
  top: 0;
  height: 100%;
  writing-mode: vertical-lr;
  background-color: #ff0000aa;
  z-index: 1;
`
export const NavigationButton = ({ direction }) => {
  const imageIds = useRecoilValue(atoms.imageIds);

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
    <NavigationButtonRoot
      direction={direction}
      visible={imageIds.length > 1}
      onClick={onClick}>
      <FontAwesomeIcon icon={direction === 'left' ? faArrowLeft : faArrowRight} />
    </NavigationButtonRoot>
  )
}

// TODO: refactor
const GallerySliderImagesRoot = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 0;
  right: auto;
  top: auto;
  transition: all 500ms ease 0s;
`
const GallerySliderRoot = styled.div`
  background-color: #333;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`
export const GallerySlider = ({ visibleCount }) => {
  const imageIds = useRecoilValue(atoms.imageIds);

  return (
    <GallerySliderRoot>
      <NavigationButton direction={'left'} />

      <GallerySliderImagesRoot>
        {imageIds.map((id, i) =>
          <Image key={i} id={id} />
        )}
      </GallerySliderImagesRoot>

      <NavigationButton direction={'right'} />
    </GallerySliderRoot>
  )
}

const ThumbnailsRoot = styled.div`
  height: 70px;
  margin: 10px 0;
`
export const Thumbnails = () => {
  return (
    <ThumbnailsRoot>
      <GallerySlider visibleCount={4} />
    </ThumbnailsRoot>
  )
}

const EnlargedActiveImageRoot = styled.div`
  height: 400px;
`
export const EnlargedActiveImage = () => {
  return (
    <EnlargedActiveImageRoot>
      <GallerySlider visibleCount={1} />
    </EnlargedActiveImageRoot>
  )
}

const GalleryRoot = styled.div`
  background-color: #666;
  width: 800px;
`
export const Gallery = () => {
  const addImage = useAddImageCallback();
  useEffect(() => {
    addImage(emptyImage);
  }, [addImage]);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        addImage({
          id: uuidv4(),
          url: `https://picsum.photos/seed/${uuidv4()}/200/300`
        });
      }, 0);
    }
  }, [addImage]);

  return (
    <GalleryRoot>
      <Input />
      <Thumbnails />
      <EnlargedActiveImage />
    </GalleryRoot>
  )
}
