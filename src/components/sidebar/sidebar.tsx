import { useRecoilValue } from 'recoil';
import { itemList, selectedId } from '@/recoil/item/atom';
import ListItem from '@/components/list-item/list-item';
import AddButtons from './add-buttons';

import './sidebar.style.scss';

export default function Sidebar() {
  const items = useRecoilValue(itemList);
  const activeId = useRecoilValue(selectedId);

  return (
    <div className="sidebar-container">
      <AddButtons />
      <div className="items-container">
        {items.map((it, index) => (
          <ListItem key={`list-item-${index}`} {...it} active={it.id === activeId} />
        ))}
      </div>
    </div>
  );
}
