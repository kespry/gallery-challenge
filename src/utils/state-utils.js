import {
  atom as recoilAtom,
  selector as recoilSelector,
  atomFamily as recoilAtomFamily,
} from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export const atom = state => recoilAtom({ key: uuidv4(), default: state });

export const atomFamily = state => recoilAtomFamily({ key: uuidv4(), default: state });

export const selector = get => recoilSelector({ key: uuidv4(), get });
