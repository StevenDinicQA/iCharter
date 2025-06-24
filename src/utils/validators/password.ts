export function doesPasswordMeetsNeeds(password: string) {
  return (
    password !== "" &&
    password.length >= 8 &&
    /\d/.test(password) &&
    /[!@#$%^&*.,?_\-()+={}><\/\\|\[\]':;~`"]/.test(password)
  );
}
