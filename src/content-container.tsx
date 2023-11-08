import React, { ReactNode } from 'react';

import './content-container.style.scss';

interface IMain {
  children: ReactNode;
}

export default function Main({ children }: IMain) {
  return <main className="main-container">{children}</main>;
}
