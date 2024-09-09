import { useEffect } from 'react';

const useInsObserver = (ref, callback) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, callback]);
};

export default useInsObserver;
