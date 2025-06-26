import { CODE_LENGHT } from "./constants";

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function getRandomString() {
  let result = '';
  let used = new Set();
  while (result.length < CODE_LENGHT) {
    const idx = Math.floor(Math.random() * chars.length);
    const char = chars[idx];
    if (!used.has(char)) {
      result += char;
      used.add(char);
    }
  }
  return result;
}

function isValidInputString(input: string): boolean {
  if (input.length !== CODE_LENGHT) return false;
  const upper = input.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    if (!chars.includes(upper[i])) return false;
  }
  return true;
}

export { getRandomString, isValidInputString };