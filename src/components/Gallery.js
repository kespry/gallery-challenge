import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styled, { css } from 'styled-components'
import urlRegex from 'url-regex'
import { atom, atomFamily, selector, useRecoilCallback, useRecoilValue } from "recoil";
import { useRecoilState } from "recoil/dist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import useDimensions from "react-use-dimensions";

styled.div = styled.div || {};

export const emptyImage = {
  id: uuidv4(),
  url: 'https://i.imgur.com/hUkwowL.png'
}
export const atoms = {
  imageIds: atom({
    key: 'atom/imageIds',
    default: [emptyImage.id]
  }),
  activeImageId: atom({
    key: 'atom/activeImageId',
    default: emptyImage.id
  }),
  imageFamily: atomFamily({
    key: 'atomFamily/image',
    default: id => ({
      id,
      url: emptyImage.url
    })
  })
}
const selectors = {
  activeImageIndex: selector({
    key: 'selector/activeImageIndex',
    get: ({ get }) => {
      const imageIds = get(atoms.imageIds);
      const activeImageId = get(atoms.activeImageId);
      return Math.max(0, imageIds.indexOf(activeImageId));
    }
  })
}

const useAddImagesCallback = () => useRecoilCallback(({ snapshot, set }) => async images => {
  const imageIds = await snapshot.getPromise(atoms.imageIds);

  for (const image of images) {
    set(atoms.imageFamily(image.id), image);
  }

  const newIds = images.map(x => x.id);
  if (imageIds.length === 1 && imageIds[0] === emptyImage.id) {
    set(atoms.imageIds, newIds);
    set(atoms.activeImageId, newIds[0]);
  } else {
    set(atoms.imageIds, [...imageIds, ...newIds]);
  }

}, []);

const InputRoot = styled.input`
  display: inherit;
`
export const Input = () => {
  const [url, setUrl] = useState('')

  const addImages = useAddImagesCallback();

  return (
    <InputRoot
      placeholder="Insert a new image entering the URL..."
      type="search"
      autoComplete="off"
      data-testid="input"
      value={url}
      onChange={({ currentTarget }) => {
        setUrl(currentTarget.value)
      }}
      onKeyUp={({ key }) => {
        if (key === 'Enter') {
          if (urlRegex().test(url)) {
            addImages([{
              id: uuidv4(),
              url
            }]);
            setUrl('');
          }
        }
      }}
    />
  )
}

const ImageRoot = styled.img`
  width: ${props => props.width}px;
  transition: all 500ms ease 0s;

    ${props => props.active
  ? css`
    `
  : css`
      opacity: 0.3;
      cursor: pointer;
    `}
`
export const Image = ({ id, width }) => {
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
      {loading && <div style={{ width: '100%', height: '100%' }}><FontAwesomeIcon spin={true} icon={faSpinner} /></div>}
      <ImageRoot
        src={image.url}
        data-testid="img"
        width={width}
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
    const activeImageIndex = await snapshot.getPromise(selectors.activeImageIndex);

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
    // TODO: !!
    // console.log('activeImageIndex, newIndex', activeImageIndex, newIndex);
  }, [imageIds])

  return (
    <NavigationButtonRoot
      data-testid={`navigation-${direction}`}
      direction={direction}
      visible={imageIds.length > 1}
      onClick={onClick}>
      <FontAwesomeIcon icon={direction === 'left' ? faArrowLeft : faArrowRight} />
    </NavigationButtonRoot>
  )
}

const GallerySliderImagesRoot = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: ${props => -(props['data-first-visible'] * props.imageWidth)}px;
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
  const activeImageIndex = useRecoilValue(selectors.activeImageIndex);
  const [ref, { width }] = useDimensions();


  const centerAlignment = Math.round(visibleCount / 2);
  const maxFirstVisible = imageIds.length - visibleCount;
  const firstVisibleStart = Math.max(0, activeImageIndex - centerAlignment + 1);
  const firstVisibleEnd = Math.min(activeImageIndex, maxFirstVisible);
  const firstVisible = Math.min(firstVisibleStart, firstVisibleEnd);

  const imageWidth = (width || 0) / visibleCount;

  return (
    <GallerySliderRoot ref={ref}>
      <NavigationButton direction={'left'} />

      <GallerySliderImagesRoot
        data-testid="slider"
        data-first-visible={firstVisible}
        imageWidth={imageWidth} >

        {imageIds.map((id, i) =>
          <Image
            id={id}
            key={i}
            width={imageWidth} />
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
      <GallerySlider visibleCount={7} />
    </ThumbnailsRoot>
  )
}

const ZoomRoot = styled.div`
  height: 400px;
`
export const Zoom = () => {
  return (
    <ZoomRoot>
      <GallerySlider visibleCount={1} />
    </ZoomRoot>
  )
}

const GalleryRoot = styled.div`
  background-color: #666;
  width: 800px;
`

export const testData =
  [...Array(10).keys()]
    .map(i => ({
      id: uuidv4(),
      url: `https://picsum.photos/seed/${i}/200/300`
    }))

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
