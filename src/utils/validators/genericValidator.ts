/**
 * This function let you know if the given value is valid or not. Extending the
 * native javascript coercion to boolean functionality.
 * @param value A given value to check their validity
 * @param regex Optional Regular Expression to check with
 * @returns
 */
export function getValidity(value: any, regex?: RegExp): Boolean {
  if (value === null || value === undefined || value === "" || value === 0) {
    return false;
  }

  if (Array.isArray(value) && value.length === 0) {
    return false;
  }

  if (Array.isArray(value) && value.length === 1 && value[0] === "") {
    return false;
  }

  if (regex && !regex.test(value)) {
    return false;
  }

  return true;
}
