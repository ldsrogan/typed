import React, { useRef } from 'react';
import { useCallback } from 'react';
import useUpdateItems from '@/recoil/item/use-update-item';
import Button, { IButton } from '@/components/button/button';
import { supportedFiles } from '@/common/data';

import './upload-file.style.scss';

export default function UploadFileButton(props: IButton) {
  const ref = useRef<any>();
  const { addItem } = useUpdateItems();

  const handleFileAdded = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const filtered: File[] = [];

    if (files) {
      // for (let i = 0; i < files.length; i += 1) {
      //   const file: File = files[i];
      //   if (file) {
      //     // const included = acceptFileExts.includes(
      //     //   `.${file.name.split('.').pop() as string}`,
      //     // );

      //     // if (included) {
      //     filtered.push(file);
      //     // }
      //   }
      // }

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
      addItem({ title: file.name, type: 'img', src: reader.result as string });
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
