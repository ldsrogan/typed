import { atom } from 'recoil';
import { TToast } from '@/common/types';
import { ReactNode } from 'react';

// toast's visibility control (if the toast info exist, the toast will appear)
export const toastState = atom<{ elem: ReactNode; type: TToast } | null>({
  key: '@toast/state',
  default: null,
});
