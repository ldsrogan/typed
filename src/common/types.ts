export type TToast = 'warn' | 'info' | 'error';

export type TAnimation = 'loading';

export type TListType = 'youtube' | 'url' | 'img';

export type TListItem = {
  id: number;
  title: string;
  src: string | ArrayBuffer;
  type: TListType;
};
