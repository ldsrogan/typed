import { useState } from 'react';
import { TypedIcon } from 'typed-design-system';
import useCheckOutside from '@/hooks/useCheckOutside';
import { youtubeEmbeddedUrl } from '@/utilities/string-format';
import useToast from '@/hooks/useToast';
import useUpdateItems from '@/recoil/item/useUpdateItem';
import TextBox from '@/components/textbox/textbox';
import { isYoutube, validateUrl } from '@/utilities/validate';
import { TListType } from '@/common/types';

import './add-url.style.scss';

interface IAddUrlDialog {
  onClose: () => void;
}

export function AddUrlDialog({ onClose }: IAddUrlDialog) {
  const ref = useCheckOutside(onClose, 'add-url-btn');
  const { addItem } = useUpdateItems();
  const [error, setError] = useState('');
  const showToast = useToast();

  const handleAddUrl = (str: string) => {
    if (!validateUrl(str)) {
      setError('올바른 형식의 URL을 입력하세요');
    } else {
      setError('');

      let type = 'url' as TListType;
      let parsedUrl = str;
      if (isYoutube(str)) {
        type = 'youtube';
        parsedUrl = youtubeEmbeddedUrl(str);
      }

      if (addItem({ title: str, src: parsedUrl, type })) {
        showToast('Successfully added your resource', 'info');
      } else {
        showToast(
          'Failed to add your resource. The resource already exists in the list.',
          'error',
        );
      }

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
