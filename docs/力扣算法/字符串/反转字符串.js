reverseString(str) {
  let i = 0
  if (typeof str !== 'string') return
  let x = str.length - 1
  while(i < x) {
    [str[i], str[x]] = [str[x], str[i]]
    i++;
    x--;
  }
  return str
}

reverseString('abc')