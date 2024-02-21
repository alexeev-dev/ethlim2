const DIGITS_64 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-'
const TO_64 = DIGITS_64.split('')
const FNV_OFFSET = 2166136261
const FNV_PRIME = 16777619

export function to64(number) {
  let current = number
  let result = ''
  let lnz = 0

  for (let i = 0; i < 6; i++) {
    const digit = current & 0x3f
    result = TO_64[digit] + result
    lnz = digit !== 0 ? i : lnz
    current >>>= 6
  }

  return result.slice(5 - lnz)
}

export function hash32(src) {
  const max = src.length
  let hash = FNV_OFFSET
  for (let i = 0; i < max; i++) {
    hash ^= src.charCodeAt(i)
    hash *= FNV_PRIME
  }
  return to64(hash >>> 0)
}
