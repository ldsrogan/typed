import { atom } from 'recoil';
import { TListItem } from '@/common/types';

export const itemList = atom<TListItem[]>({
  key: '@item/list',
  default: [],
});

export const itemId = atom<number>({
  key: '@item/id',
  default: 1,
});

export const selectedItem = atom<TListItem | null>({
  key: '@item/selectedItem',
  default: null,
});
