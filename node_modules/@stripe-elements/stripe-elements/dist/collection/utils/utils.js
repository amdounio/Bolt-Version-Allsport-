import { getPlatforms } from './platform';
export const checkPlatform = () => {
  const device = getPlatforms();
  if (device.includes('ios')) {
    return 'ios';
  }
  if (device.includes('android')) {
    return 'android';
  }
};
export const waitForElm = (el, selector) => {
  return new Promise(resolve => {
    if (el.querySelector(selector)) {
      return resolve(el.querySelector(selector));
    }
    const observer = new MutationObserver(() => {
      if (el.querySelector(selector)) {
        resolve(el.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(el, {
      childList: true,
      subtree: true
    });
  });
};
