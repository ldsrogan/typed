import { TListType } from '@/common/types';

import './viewer.style.scss';

export interface IAppProps {
  type: TListType;
  src: string;
  onLoaded?: () => void;
  onError?: () => void;
  onLoadStart?: () => void;
}

export default function WebViewer({
  type,
  src,
  onLoadStart,
  onLoaded,
  onError,
}: IAppProps) {
  if (type === 'youtube') {
    return (
      <div className="webviewer-container">
        <div className="youtube-frame-wrapper">
          <iframe
            width="100%"
            height="100%"
            src={src}
            title="embedded-frame"
            onLoad={() => {
              if (onLoaded) onLoaded();
            }}
            onError={() => {
              if (onError) onError();
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
  return (
    <iframe
      width="100%"
      height="100%"
      src={src}
      title="embedded-frame"
      onLoadStart={() => {
        if (onLoadStart) {
          onLoadStart();
        }
      }}
      onLoad={() => {
        console.log('loaded');
        if (onLoaded) onLoaded();
      }}
      onError={() => {
        console.log('loaded');
        if (onError) onError();
      }}
      frameBorder="0"
      // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      // allowFullScreen
    />
  );
}
