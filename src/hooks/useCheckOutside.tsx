import { useEffect, useRef } from 'react';

// reusable custom hook to check if the mouse clicking outside of the current target.
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
