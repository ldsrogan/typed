import { IViewer } from './interface';
import './image-viewer.style.scss';

export default function ImageViewer({ src, onLoaded, onError }: IViewer) {
  return (
    <div className="img-wrapper">
      <img
        className="img-container"
        src={src}
        alt=""
        onLoad={() => {
          if (onLoaded) onLoaded();
        }}
        onError={() => {
          if (onError) onError();
        }}
      />
    </div>
  );
}
