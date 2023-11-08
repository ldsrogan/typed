import { ButtonHTMLAttributes } from 'react';

import './button.style.scss';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  fitContent?: boolean;
  noBorder?: boolean;
}

export default function Button({ fitContent, noBorder, children, ...props }: IButton) {
  return (
    <button
      className={`button${noBorder ? '-no-border' : ''}`}
      {...props}
      style={{ width: fitContent ? 'fit-content' : '100%' }}
      type="button"
    >
      {children}
    </button>
  );
}
