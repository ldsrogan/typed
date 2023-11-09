import { selector } from 'recoil';
import { itemList, selectedId } from './atom';
import { TListItem } from '@/common/types';

export const selectedItem = selector<TListItem | null>({
  key: '@item/selector/item',
  get: ({ get }) => {
    const items = get(itemList);
    const selected = get(selectedId);
    const found = items.find((it) => it.id === selected);
    return found || null;
  },
});
