import axios from "axios";
import { useEffect, useRef, useState } from "react";

const useInfiniteScrolling = (
  cb: (cb: (more: boolean) => void) => void,
  data: any
) => {
  const intersectionObserverRef = useRef<HTMLDivElement>(null);
  const [More, setMore] = useState(true);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    // intersection observer
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && More) {
        // fetch more
        cb((more) => {
          setMore(more);
        });
      }
    });

    // Start observing the target node
    intersectionObserverRef.current &&
      observer.observe(intersectionObserverRef.current);

    return () => {
      if (intersectionObserverRef.current) {
        observer.unobserve(intersectionObserverRef.current);
      }
      cancelToken.cancel();
    };
  }, [data, More]);

  const HaseMore = (more: boolean) => {
    setMore(more);
  };

  return {
    More,
    HaseMore,
    intersectionObserverRef,
  };
};

export default useInfiniteScrolling;
