import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Gallery, emptyImage, testData } from "./components/Gallery";
import { renderWithRecoil, flushPromisesAndTimers } from "./utils/test-utils";


describe('Gallery', () => {

  it('Gallery with an empty image by default', async () => {
    const { queryAllByTestId } = renderWithRecoil(
      <Gallery autoLoadTestData={false} />
    );

    const imgs = queryAllByTestId('img');
    expect(imgs.length).toBe(2);

    const [thumbnailImg, zoomImg] = imgs;
    expect(thumbnailImg.src).toBe(emptyImage.url);
    expect(zoomImg.src).toBe(emptyImage.url);
  });

  it('Adding one image to the gallery replaces the empty image', async () => {
    jest.useFakeTimers('modern');

    const { queryByTestId, queryAllByTestId } = renderWithRecoil(
      <Gallery autoLoadTestData={false} />
    );

    const input = queryByTestId('input');

    fireEvent.change(input, { target: { value: testData[0].url } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    await flushPromisesAndTimers();

    const imgs = queryAllByTestId('img');
    expect(imgs.length).toBe(2);

    const [thumbnailImg, zoomImg] = imgs;
    expect(thumbnailImg.src).toBe(testData[0].url);
    expect(zoomImg.src).toBe(testData[0].url);
  });

  it('Adding a second image to the gallery', async () => {
    jest.useFakeTimers('modern');

    const { queryByTestId, queryAllByTestId } = renderWithRecoil(
      <Gallery autoLoadTestData={false} />
    );

    let input = queryByTestId('input');

    fireEvent.change(input, { target: { value: testData[0].url } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    await flushPromisesAndTimers();

    fireEvent.change(input, { target: { value: testData[1].url } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    await flushPromisesAndTimers();

    const imgs = queryAllByTestId('img');
    expect(imgs.length).toBe(4);

    const [thumbnailImg1, thumbnailImg2] = imgs;
    expect(thumbnailImg1.src).toBe(testData[0].url);
    expect(thumbnailImg2.src).toBe(testData[1].url);
  });

  it('Test data automatically loaded', async () => {
    jest.useFakeTimers('modern');

    const { queryAllByTestId } = renderWithRecoil(
      <Gallery autoLoadTestData={true} />
    );

    await flushPromisesAndTimers();

    const imgs = queryAllByTestId('img');
    expect(imgs.length).toBe(testData.length * 2);
  });
});

