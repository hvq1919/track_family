function getRandomString() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  let used = new Set();
  while (result.length < 5) {
    const idx = Math.floor(Math.random() * chars.length);
    const char = chars[idx];
    if (!used.has(char)) {
      result += char;
      used.add(char);
    }
  }
  return result;
}

export { getRandomString };