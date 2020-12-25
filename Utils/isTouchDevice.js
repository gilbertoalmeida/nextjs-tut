export default function isTouchDevice3() {
  return !!('ontouchstart' in window        // works on most browsers 
    || navigator.maxTouchPoints);       // works on IE10/11 and Surface
};