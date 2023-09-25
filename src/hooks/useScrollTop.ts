const useScrollToTop = () => {
  const handleScrollTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return handleScrollTopClick;
};

export default useScrollToTop;
