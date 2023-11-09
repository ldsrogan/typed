import { IViewer } from './interface';

import './youtube-viewer.style.scss';

export default function YoutubeViewer({ src, onLoaded, onError }: IViewer) {
  return (
    <div className="webviewer-container">
      <div className="youtube-frame-wrapper">
        <iframe
          id="resource-viewer"
          width="100%"
          height="100%"
          src={`${src}?${Math.random()}`} // to handle the same source cache
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
