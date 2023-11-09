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

export const selectedId = atom<number>({
  key: '@item/selectedItemId',
  default: -1,
});
