import { IViewer } from './interface';

import './webviewer.style.scss';

export default function WebViewer({ src, onLoadStart, onLoaded, onError }: IViewer) {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`${src}?${Math.random()}`}
      title="embedded-frame"
      onLoadStart={() => {
        if (onLoadStart) {
          onLoadStart();
        }
      }}
      onLoad={() => {
        if (onLoaded) onLoaded();
      }}
      onError={() => {
        console.log('error');
        if (onError) onError();
      }}
      frameBorder="0"
    />
  );
}
