export type TToast = 'warn' | 'info' | 'error';

export type TAnimation = 'loading';

export type TListType = 'youtube' | 'url' | 'img';

export type TListItem = {
  id: number;
  origin: string;
  title: string;
  src: string;
  type: TListType;
};
