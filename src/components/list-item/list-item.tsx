import { useEffect, useState } from 'react';
import { TypedIcon } from 'typed-design-system';
import { useSetRecoilState } from 'recoil';
import TextBox from '@/components/textbox/textbox';
import { TListItem, TListType } from '@/common/types';
import { itemList, selectedId } from '@/recoil/item/atom';
import Button from '@/components/button/button';

import './list-item.style.scss';

export interface IListItem {
  id: number;
  title: string;
  src: string | ArrayBuffer;
  type: TListType;
  active?: boolean;
}

const ListItem = ({ id, title, src, type, active }: IListItem) => {
  const [edit, setEdit] = useState(false);
  const [tempTitle, setTempTitle] = useState<string>('');
  const setItems = useSetRecoilState(itemList);
  const setSelectedId = useSetRecoilState(selectedId);

  useEffect(() => {
    setTempTitle(title);
  }, [title]);

  return (
    <div
      className={`listitem-container${active ? '-active' : ''}`}
      role="none"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(id);
      }}
    >
      {!edit ? (
        <div className="listitem-title">{title}</div>
      ) : (
        <TextBox
          value={tempTitle}
          onChange={(res: string) => {
            setTempTitle(res);
          }}
          handleInput={(res: string) => {
            setItems((prev) => {
              const found = prev.find((it: TListItem) => it.id === id);
              if (found) {
                const dup: TListItem = { ...found, title: res };

                return [...prev.filter((pv) => pv.id !== id), dup].sort(
                  (b, a) => a.id - b.id,
                );
              }
              return prev;
            });
            setEdit(false);
          }}
        />
      )}
      <div className="listitem-buttons">
        <Button
          fitContent
          noBorder
          onClick={(e) => {
            e.stopPropagation();
            setEdit(true);
          }}
        >
          <TypedIcon className="listitem-button" icon="edit_19" />
        </Button>
        <Button
          fitContent
          noBorder
          onClick={(e) => {
            e.stopPropagation();
            setItems((prev) => {
              return prev.filter((pv) => pv.id !== id);
            });
          }}
        >
          <TypedIcon className="listitem-button" icon="trash_19" />
        </Button>
      </div>
    </div>
  );
};

export default ListItem;
