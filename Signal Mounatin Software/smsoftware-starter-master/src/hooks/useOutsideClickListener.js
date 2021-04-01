import React from 'react';

const useOutsideClickListener = (ref, cb) => {
  const stableCB = React.useCallback(cb, [cb]);
  React.useEffect(() => {
    const outsideClickListener = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        stableCB();
      }
    };
    document.addEventListener('mousedown', outsideClickListener);
    return () => {
      document.removeEventListener('mousedown', outsideClickListener);
    };
  }, [ref, stableCB]);
};

export default useOutsideClickListener;
