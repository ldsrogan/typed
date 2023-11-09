import { ReactNode } from 'react';

import './content-container.style.scss';

interface IMain {
  children: ReactNode;
}

// main layout container
export default function Main({ children }: IMain) {
  return <main className="main-container">{children}</main>;
}
