import { act, render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import React from 'react';

export function renderWithRecoil(elements) {
  return render(<RecoilRoot>{elements}</RecoilRoot>);
}

export function flushPromisesAndTimers() {
  return new Promise(resolve => {
    setTimeout(resolve, 100);
    act(() => jest.runAllTimers());
  });
}
