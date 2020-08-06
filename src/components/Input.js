import React, { useState } from "react";
import styled from "styled-components";
import { useAddImagesCallback } from "../state";
import urlRegex from "url-regex";
import { v4 as uuidv4 } from "uuid";


const InputRoot = styled.input`
`
export const Input = () => {
  const [url, setUrl] = useState('');

  const addImages = useAddImagesCallback();

  return (
    <InputRoot
      placeholder="Insert a new image entering the URL..."
      type="search"
      autoComplete="off"
      data-testid="input"
      value={url}
      onChange={({ currentTarget }) => setUrl(currentTarget.value)}
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
