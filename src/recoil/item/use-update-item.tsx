import { useRecoilState, useSetRecoilState } from 'recoil';
import { itemId, itemList } from './atom';
import { TListItem } from '@/common/types';

export default function useUpdateItems() {
  const setItems = useSetRecoilState(itemList);
  const [curId, setNextId] = useRecoilState(itemId);

  const addItem = (newItem: Omit<TListItem, 'id'>) => {
    const itemWithId = { ...newItem, id: curId };
    setItems((prev) => {
      return [itemWithId, ...prev];
    });
    setNextId(curId + 1);

    return itemWithId;
  };

  return { addItem };
}
