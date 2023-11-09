import { useRecoilState, useSetRecoilState } from 'recoil';
import nextId from '@/common/itemid';

import { useCallback } from 'react';
import { itemList, selectedId } from './atom';
import { TListItem } from '@/common/types';

export default function useUpdateItems() {
  const [items, setItems] = useRecoilState(itemList);
  const setSelectedId = useSetRecoilState(selectedId);

  const addItem = useCallback(
    (newItem: Omit<TListItem, 'id'>) => {
      const curId = nextId();
      const itemWithId = { ...newItem, id: curId };
      setItems((prev) => {
        return [itemWithId, ...prev];
      });

      if (items.length === 0) {
        setSelectedId(curId);
      }
      console.log(curId);
    },
    [items],
  );

  return { addItem };
}
