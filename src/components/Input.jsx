import React, { useState } from 'react';
import styled from 'styled-components';
import urlRegex from 'url-regex';
import { v4 as uuidv4 } from 'uuid';
import { useAddImagesCallback } from '../state';

const InputRoot = styled.input`
  width: 100%;
  font-family: 'Segoe UI', sans-serif;
  background-color: #444;
  color: #ddd;
  border: none;
  padding: 10px;
  border-radius: 5px;
`;
const Input = () => {
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
              url,
            }]);
            setUrl('');
          }
        }
      }}
    />
  );
};
export default Input;
