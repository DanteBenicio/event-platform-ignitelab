/**
 * Receive a string and returns the string with the first letter capitalized.
 *
 * @param str
 * @returns
 */

export const CapitalizeLetter = (str: string) => {
  const firstLetter = str[0].toUpperCase()
  const stringWithoutFirstLetter = str.slice(1)

  return firstLetter + stringWithoutFirstLetter
}
