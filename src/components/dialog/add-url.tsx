import { useState } from 'react';
import { TypedIcon } from 'typed-design-system';
import useCheckOutside from '@/hooks/useCheckOutside';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { itemId, itemList, selectedItem } from '@/recoil/item/atom';
import { youtubeEmbeddedUrl } from '@/utilities/string-format';
import useToast from '@/hooks/useToast';
import TextBox from '@/components/textbox/textbox';
import { isYoutube, validateUrl } from '@/utilities/validate';
import { TListType } from '@/common/types';

import './add-url.style.scss';

interface IAddUrlDialog {
  onClose: () => void;
}

export function AddUrlDialog({ onClose }: IAddUrlDialog) {
  const ref = useCheckOutside(onClose, 'add-url-btn');
  const [items, setItems] = useRecoilState(itemList);
  const setSelectedItem = useSetRecoilState(selectedItem);
  const [id, setId] = useRecoilState(itemId);
  const [error, setError] = useState('');
  const showToast = useToast();

  const handleAddUrl = (str: string) => {
    if (!validateUrl(str)) {
      setError('올바른 형식의 URL을 입력하세요');
    } else {
      setError('');
      const curId = id;
      setId(curId + 1);

      let type = 'url' as TListType;
      let parsedUrl = str;
      if (isYoutube(str)) {
        type = 'youtube';
        parsedUrl = youtubeEmbeddedUrl(str);
      }

      const newItem = { id: curId, title: str, src: parsedUrl, type };
      setItems((prev) => {
        return [newItem, ...prev];
      });
      if (items.length === 0) {
        setSelectedItem(newItem);
      }
      showToast('리소스가 추가되었습니다.', 'info');
      onClose();
    }
  };

  return (
    <div className="add-url-container" ref={ref}>
      <div className="add-url-body">
        <TypedIcon icon="copy_link_19" />
        <TextBox
          error={!!error}
          handleInput={(res: string) => {
            handleAddUrl(res);
          }}
        />
      </div>
      {error && <div className="url-error-message">{error}</div>}
    </div>
  );
}
