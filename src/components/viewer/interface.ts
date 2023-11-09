import { TListType } from '@/common/types';

export interface IViewer {
  type: TListType;
  src: string;
  onLoaded?: () => void;
  onError?: () => void;
  onLoadStart?: () => void;
}
