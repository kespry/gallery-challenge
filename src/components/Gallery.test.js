import React from 'react';
import { act } from '@testing-library/react';
import { Gallery } from "./Gallery";
import { flushPromisesAndTimers, renderWithRecoil } from "../utils/test-utils";
import { emptyImage, testData } from "../state";
import { fireEvent } from "@testing-library/dom";


describe('Data Loading', () => {
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

describe('Navigation', () => {
  it('Backwards from first to start of last page', async () => {
    jest.useFakeTimers('modern');

    const { getAllByTestId } = renderWithRecoil(
      <Gallery autoLoadTestData={true} />
    );
    await flushPromisesAndTimers();

    const [thumbnailsSlider, zoomSlider] = getAllByTestId('slider');
    const navigationLeft = getAllByTestId('navigation-left')[0];

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "0");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "0");

    const clickLeft = async () => {
      fireEvent.click(navigationLeft);
      await flushPromisesAndTimers();
      act(() => jest.runAllTimers());
    }

    await clickLeft();

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "3");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "9");

    await clickLeft();

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "3");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "8");

    await clickLeft();

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "3");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "7");

    await clickLeft();

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "3");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "6");

    await clickLeft();

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "2");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "5");
  });

  it('Forward from the start until first scroll', async () => {
    jest.useFakeTimers('modern');

    const { getAllByTestId } = renderWithRecoil(
      <Gallery autoLoadTestData={true} />
    );
    await flushPromisesAndTimers();

    const [thumbnailsSlider, zoomSlider] = getAllByTestId('slider');
    const navigationRight = getAllByTestId('navigation-right')[0];

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "0");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "0");

    const clickRight = async () => {
      fireEvent.click(navigationRight);
      await flushPromisesAndTimers();
      act(() => jest.runAllTimers());
    }

    await clickRight();

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "0");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "1");

    await clickRight();

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "0");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "2");

    await clickRight();

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "0");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "3");

    await clickRight();

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "1");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "4");
  });

  it('Manual image click', async () => {
    jest.useFakeTimers('modern');

    const { getAllByTestId } = renderWithRecoil(
      <Gallery autoLoadTestData={true} />
    );
    await flushPromisesAndTimers();

    const imgs = getAllByTestId('img');

    fireEvent.click(imgs[6]);
    await flushPromisesAndTimers();
    act(() => jest.runAllTimers());

    const [thumbnailsSlider, zoomSlider] = getAllByTestId('slider');

    expect(thumbnailsSlider).toHaveAttribute("data-first-visible", "3");
    expect(zoomSlider).toHaveAttribute("data-first-visible", "6");
  });
});
