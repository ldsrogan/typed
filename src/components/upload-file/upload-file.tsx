import React, { useRef } from 'react';
import { useState, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { itemList } from '@/recoil/item/atom';
import Button, { IButton } from '@/components/button/button';
import { supportedFiles } from '@/common/data';

import './upload-file.style.scss';

export default function UploadFileButton(props: IButton) {
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);
  const ref = useRef<any>();
  const setitemList = useSetRecoilState(itemList);

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
        const reader = new FileReader();

        reader.onloadend = () => {
          setImgSrcs((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(files[i]);
      }

      // reset target value for latter usage
      e.target.value = '';
    }
  }, []);

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
