import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App rendered with image', async () => {
  const { queryAllByTestId } = render(
    <App />,
  );

  const imgs = queryAllByTestId('img');
  expect(imgs.length).toBeGreaterThan(0);
});
