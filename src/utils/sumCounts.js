/**
 *
 * @param {string[]} counts 각 요소 string은 {'a': 3, 'b': 4} 와 같은 형태
 * @returns {{[string]: [number]}} sumedCounts 각 count가 모두 합쳐진 결과물
 */
const sumCounts = (counts) => {
  if (counts.length === 0) return {};
  const totalCounts = {};
  for (const _count of counts) {
    let count;
    try {
      count = JSON.parse(_count);
    } catch {
      count = {};
    }
    for (let key in count) {
      if (Object.keys(totalCounts).includes(key)) {
        totalCounts[key] += count[key];
      } else {
        totalCounts[key] = count[key];
      }
    }
  }
  return totalCounts;
};

export default sumCounts;
