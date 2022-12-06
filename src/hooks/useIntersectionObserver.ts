export const useIntersectionObserver = (
  root: Document | HTMLElement,
  callback: (entries: any) => any,
  items: HTMLElement[],
  customOptions = {},
) => {
  const options = {
    root,
    rootMargin: '0px',
    threshold: 0.1,
    ...customOptions,
  };

  const observer = new IntersectionObserver(callback, options);
  items.forEach((item) => {
    observer.observe(item);
  });

  return observer;
};
