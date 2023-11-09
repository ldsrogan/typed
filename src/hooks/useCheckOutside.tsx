import { useEffect, useRef } from 'react';

const useCheckOutside = (clickOutside: () => void, exceptId?: string) => {
  const ref = useRef<any>();
  useEffect(() => {
    const checkOutsideClick = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptId
      ) {
        clickOutside();
      }
    };
    document.addEventListener('mousedown', checkOutsideClick);
    return () => {
      document.removeEventListener('mousedown', checkOutsideClick);
    };
  }, [ref]);

  return ref;
};

export default useCheckOutside;
