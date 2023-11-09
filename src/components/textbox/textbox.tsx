import { useCallback, useState } from 'react';

import './textbox.style.scss';
import useCheckOutside from '@/hooks/useCheckOutside';

interface ITextBox {
  value?: string;
  error?: boolean;
  handleInput: (res: string) => void;
  onChange?: (res: string) => void;
}

export default function TextBox({ value, handleInput, onChange, error }: ITextBox) {
  const [text, setText] = useState<string>(value || '');

  const executeChange = useCallback(() => {
    handleInput(text);
  }, [text]);

  const ref = useCheckOutside(executeChange);

  return (
    <input
      ref={ref}
      autoFocus
      value={value}
      className={`url-input${error ? '--error' : ''}`}
      type="text"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          // create List Item with url
          executeChange();
        }
      }}
      onChange={(e) => {
        setText(e.target.value);
        if (onChange) onChange(e.target.value);
      }}
    />
  );
}
