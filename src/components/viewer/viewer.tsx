import { IViewer } from './interface';

import ImageViewer from './image-viewer';
import YoutubeViewer from './youtube-viewer';

// this viewer handles all types including youtube url, url, and img.

export default function WebViewer(props: IViewer) {
  const { type } = props;

  // image viewr
  if (type === 'img') {
    return <ImageViewer {...props} />;
  }

  // youtube viewer
  if (type === 'youtube') {
    return <YoutubeViewer {...props} />;
  }

  // url viewer
  return <WebViewer {...props} />;
}
