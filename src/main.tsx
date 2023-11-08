import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
);
