import { useCallback, useEffect } from 'react';
import { TAnimation } from '@/common/types';
import lottie from 'lottie-web';
import loadingAnimation from '@/resources/animation/loading.json';

export default function useAnimation(type: TAnimation) {
  useEffect(() => {
    const elem = document.querySelector('.animation-spot');
    lottie.loadAnimation({
      name: 'loading-animation',
      container: elem as Element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // eslint-disable-next-line global-require
      animationData: loadingAnimation,
    });

    return () => {
      lottie.destroy('loading-animation');
    };
  }, [type]);

  const refresh = useCallback(() => {
    lottie.destroy('loading-animation');
    const elem = document.querySelector('.animation-spot');
    lottie.loadAnimation({
      name: 'loading-animation',
      container: elem as Element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // eslint-disable-next-line global-require
      animationData: loadingAnimation,
    });
  }, []);

  const showAnimation = () => {
    return <div className="animation-spot" style={{ width: '250px' }} />;
  };

  return { refresh, showAnimation };
}
