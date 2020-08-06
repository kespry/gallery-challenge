import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import React from 'react';
import useHover from '@react-hook/hover';
import { atoms, selectors } from '../state';

const NavigationButtonRoot = styled.div`
  cursor: pointer;
  position: absolute;
  color: #444;
  ${props => props.direction}: 0;
  display: ${props => props.visible ? 'block' : 'none'};
  top: 0;
  height: 100%;
  writing-mode: vertical-lr;
  text-align: center;
  padding: 0 15px;
  transition: all 500ms ease 0s;
  opacity: ${props => props.hovered ? '1' : '0.5'};
  z-index: 1;
`;
const NavigationButton = ({ direction }) => {
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
  }, [imageIds]);

  const ref = React.useRef(null);
  const hovered = useHover(ref);

  return (
    <NavigationButtonRoot
      ref={ref}
      hovered={hovered}
      data-testid={`navigation-${direction}`}
      direction={direction}
      visible={imageIds.length > 1}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={direction === 'left' ? faArrowLeft : faArrowRight} />
    </NavigationButtonRoot>
  );
};
export default NavigationButton;
