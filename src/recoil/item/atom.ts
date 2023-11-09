import { atom } from 'recoil';
import { TListItem } from '@/common/types';

export const itemList = atom<TListItem[]>({
  key: '@item/list',
  default: [],
});

export const selectedId = atom<number>({
  key: '@item/selectedItemId',
  default: -1,
});
