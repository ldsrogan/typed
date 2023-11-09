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

  // handling the input image files
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

  // using closure to hold the file info during the async call
  const loadFiles = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (
        !addItem({
          title: file.name,
          type: 'img',
          src: reader.result as string,
        })
      ) {
        showToast('Some resource already exist', 'warn');
      } else {
        showToast('Successfully added resource', 'info');
      }
    };
    reader.onerror = () => {
      showToast(`Failed to add resource: ${file.name}`, 'error');
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Button // actual UI model that calls the file input
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
      <input // hidden element which only provide the function
        className="upload-button"
        ref={ref}
        // we only accept *.jpg, and *.png files
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
