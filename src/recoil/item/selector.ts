import { selector, selectorFamily } from 'recoil';
import { itemId, itemList } from './atom';
import { TListItem } from '@/common/types';

interface Param extends TListItem {
  [key: string]: any;
}

export const itemFromList = selectorFamily<TListItem | null, Param>({
  key: '@item/selector/item',
  get:
    (item) =>
    ({ get }) => {
      const items = get(itemList);
      const found = items.find((it) => it.id === item.id);
      return found || null;
    },
});
