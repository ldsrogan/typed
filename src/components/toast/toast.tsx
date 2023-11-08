import { ReactNode, useEffect } from 'react';
import { toastState } from '@/recoil/toast/atom';
import { useSetRecoilState } from 'recoil';
import { TToast } from '@/common/types';

import './toast.style.scss';

interface IToast {
  type: TToast;
  children: ReactNode;
}

export default function Toast({ type, children }: IToast) {
  const setToast = useSetRecoilState(toastState);

  useEffect(() => {
    setTimeout(() => {
      setToast(null);
    }, 2200);

    () => {
      setToast(null);
    };
  }, []);

  return <div className={`toast-container-${type}`}>{children}</div>;
}
