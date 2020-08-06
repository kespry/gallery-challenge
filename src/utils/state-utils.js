import {
  atom as recoilAtom,
  selector as recoilSelector,
  atomFamily as recoilAtomFamily
} from "recoil";


const hashFn = (() => {
  let index = 0;
  return () => `${++index}`;
})();

export const atom = state =>
  recoilAtom({ key: hashFn(), default: state });

export const atomFamily = state =>
  recoilAtomFamily({ key: hashFn(), default: state });

export const selector = get =>
  recoilSelector({ key: hashFn(), get });
