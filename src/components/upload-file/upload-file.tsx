import { useState } from 'react';
import { supportedFiles } from '@/common/data';
import React from 'react';

import './upload-file.style.scss';

export default function UploadFileButton() {
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);

  const handleFileAdded = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  console.log(imgSrcs.length);

  return (
    <>
      {imgSrcs.map((file) => (
        <img className="preview-thumbnail" src={file} alt="" />
      ))}
      <input
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
