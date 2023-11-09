import Button from '@/components/button/button';
import UploadFileButton from '@/components/upload-file/upload-file';
import { AddUrlDialog } from '@/components/dialog/add-url';
import { useState } from 'react';

import './add-buttons.style.scss';

export default function AddButtons() {
  const [showUrlInput, setShowUrlInput] = useState(false);

  return (
    <>
      {showUrlInput && (
        <AddUrlDialog
          onClose={() => {
            setShowUrlInput(false);
          }}
        />
      )}
      <div className="add-item-buttons">
        <Button
          id="add-url-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowUrlInput((prev) => !prev);
          }}
        >
          URL 추가
        </Button>

        <UploadFileButton
          onClick={(e) => {
            e.stopPropagation();
            //
          }}
        >
          이미지 추가
        </UploadFileButton>
      </div>
    </>
  );
}
