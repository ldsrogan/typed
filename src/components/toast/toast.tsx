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
    // once the toast is set, wait 2.2 sec to hide
    setTimeout(() => {
      setToast(null);
    }, 2200);

    () => {
      // set toast to null when the component is unmounted
      setToast(null);
    };
  }, []);

  return <div className={`toast-container-${type}`}>{children}</div>;
}
