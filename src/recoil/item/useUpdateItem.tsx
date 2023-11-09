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
      let len = 0;

      let success = true;

      setItems((prev) => {
        len = prev.length;

        if (prev.find((pv) => pv.origin === newItem.origin)) {
          success = false;
          return prev;
        }

        return [itemWithId, ...prev];
      });

      if (len === 0) {
        setSelectedId(curId);
      }

      return success;
    },
    [items],
  );

  return { addItem };
}
