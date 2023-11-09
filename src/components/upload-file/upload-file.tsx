import React, { useRef } from 'react';
import { useCallback } from 'react';
import useToast from '@/hooks/useToast';
import useUpdateItems from '@/recoil/item/useUpdateItem';
import Button, { IButton } from '@/components/button/button';
import { supportedFiles } from '@/common/data';

import './upload-file.style.scss';

export default function UploadFileButton(props: IButton) {
  const ref = useRef<any>();
  const { addItem } = useUpdateItems();
  const showToast = useToast();

  const handleFileAdded = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        loadFiles(files[i]);
      }

      // reset target value for latter usage
      e.target.value = '';
    }
  }, []);

  const loadFiles = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (
        !addItem({
          title: file.name,
          type: 'img',
          origin: reader.result as string,
          src: reader.result as string,
        })
      ) {
        showToast('Resource already exist', 'error');
      }
    };
    reader.onerror = () => {
      showToast(`Failed to add resource: ${file.name}`, 'error');
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Button
        {...props}
        onClick={(e) => {
          e.stopPropagation();
          if (ref.current) {
            ref.current.click();
          }
        }}
      >
        {props.children}
      </Button>
      <input
        className="upload-button"
        ref={ref}
        accept={supportedFiles.reduce(
          (prev: string, ext: string) => `${prev}, ${ext}`,
          '',
        )}
        type="file"
        multiple
        onChange={handleFileAdded}
      />
    </>
  );
}
