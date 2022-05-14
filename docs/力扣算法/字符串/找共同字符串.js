function findSameStrFromArray(arr) {
  let result = "";
  let str = arr[0];
  // 遍历切割第一个字符串
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      const s = str.slice(i, j);
      let allMatch = true;
      arr.forEach((v, i) => {
        if (i === 0) return;
        // 如果每个都匹配，证明s就是相同的字符串
        if (!v.includes(s)) {
          allMatch = false;
        }

        if (allMatch && s.length > result.length) {
          result = s;
        }
      });
      console.warn("sss", j, s, result);
    }
  }
  console.warn("result", result);
  return result;
}

findSameStrFromArray(["abcdefd", "ab", "rererab"]);
