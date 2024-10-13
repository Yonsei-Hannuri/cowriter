export function debounce(func, delay) {
  let timeoutId = null;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId); // 이전에 설정된 타이머를 제거합니다.
    }

    // 새로운 타이머를 설정합니다.
    timeoutId = setTimeout(() => {
      func.apply(this, args); // 타이머가 끝나면 원래 함수를 호출합니다.
      timeoutId = null;
    }, delay);
  };
}
