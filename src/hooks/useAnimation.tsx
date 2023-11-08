import { useMemo } from 'react';
import { TAnimation } from '@/common/types';
import { useLottie } from 'lottie-react';
import loadingAnimation from '@/resources/animation/loading.json';

import './useAnimation.style.scss';

export default function useAnimation(type: TAnimation) {
  const options = useMemo(() => {
    let ops: any = {};

    if (type === 'loading') {
      ops = {
        animationData: loadingAnimation,
        loop: true,
      };
    }

    return ops;
  }, [type]);

  const { View } = useLottie(options);

  return <div className="animation-container">{View}</div>;
}
