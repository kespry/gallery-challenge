import styled from "styled-components";
import { atoms, selectors } from "../state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRecoilCallback, useRecoilValue } from "recoil";
import React from "react";


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
