import React, { useState } from "react";
import styled, { css } from "styled-components";
import { atoms } from "../state";
import { useRecoilState } from "recoil/dist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";


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

  return (
    <div>
      {loading && <div style={{ width: '100%', height: '100%' }}>
        <FontAwesomeIcon spin={true} icon={faSpinner} />
      </div>}
      <ImageRoot
        src={image.url}
        data-testid="img"
        width={width}
        active={image.id === activeImageId}
        alt={JSON.stringify(image)}
        onLoad={() => setLoading(false)}
        onClick={() => activeImageId !== id && setActiveImageId(image.id)} />
    </div>
  )
}
