import { v4 as uuidv4 } from "uuid";
import { atom, atomFamily, selector } from "./utils/state-utils";
import { useRecoilCallback } from "recoil";


export const emptyImage = {
  id: uuidv4(),
  url: 'https://i.imgur.com/hUkwowL.png'
}

export const testData =
  [...Array(10).keys()]
    .map(i => ({
      id: uuidv4(),
      url: `https://picsum.photos/seed/${i}/200/300`
    }))

export const atoms = {
  imageIds: atom([emptyImage.id]),
  activeImageId: atom(emptyImage.id),
  imageFamily: atomFamily(id => ({
    id,
    url: emptyImage.url
  }))
}

export const selectors = {
  activeImageIndex: selector(({ get }) => {
    const imageIds = get(atoms.imageIds);
    const activeImageId = get(atoms.activeImageId);
    return Math.max(0, imageIds.indexOf(activeImageId));
  })
}

export const useAddImagesCallback = () => useRecoilCallback(({ snapshot, set }) => async images => {
  const imageIds = await snapshot.getPromise(atoms.imageIds);

  for (const image of images) {
    set(atoms.imageFamily(image.id), image);
  }

  const newIds = images.map(x => x.id);
  if (imageIds.length === 1 && imageIds[0] === emptyImage.id) {
    set(atoms.imageIds, newIds);
    set(atoms.activeImageId, newIds[0]);
  } else {
    set(atoms.imageIds, [...imageIds, ...newIds]);
  }
}, []);
