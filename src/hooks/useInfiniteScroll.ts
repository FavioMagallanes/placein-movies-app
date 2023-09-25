import { useEffect, useState } from "react";

const useInfiniteScroll = (callback: () => Promise<void>) => {
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (windowHeight + scrollTop >= documentHeight - 100 && !loadingMore) {
        setLoadingMore(true);
        callback().then(() => {
          setLoadingMore(false);
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback, loadingMore]);

  return loadingMore;
};

export default useInfiniteScroll;
