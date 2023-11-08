import { ReactNode } from 'react';
import { TToast } from '@/common/types';
import { useSetRecoilState } from 'recoil';
import { toastState } from '@/recoil/toast/atom';

export default function useToast() {
  const setToast = useSetRecoilState(toastState);

  const showToast = (src: ReactNode, type: TToast) => {
    setToast({ elem: src, type });
  };

  return showToast;
}
