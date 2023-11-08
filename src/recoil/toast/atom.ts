import { atom } from 'recoil';
import { TToast } from '@/common/types';
import { ReactNode } from 'react';

export const toastState = atom<{ elem: ReactNode; type: TToast } | null>({
  key: '@toast/state',
  default: null,
});
