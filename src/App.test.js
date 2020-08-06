import React from 'react';
import App from "./App";
import { renderWithRecoil } from "./utils/test-utils";


test('App rendered with image', async () => {
  const { queryAllByTestId } = renderWithRecoil(
    <App />
  );

  const imgs = queryAllByTestId('img');
  expect(imgs.length).toBeGreaterThan(0);
});
