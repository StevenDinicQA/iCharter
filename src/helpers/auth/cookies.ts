import { FBLoginResponse, LoginResponse } from "@/types/auth/Login";
import Cookies from "js-cookie";

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function saveAuthCookies(data: LoginResponse) {
  const accessTokenExpires = data!.accessToken.payload.exp;
  const expirationDate = new Date(accessTokenExpires * 1000);

  Cookies.set("email", data.idToken.payload.email, {
    expires: addDays(expirationDate, 90),
  });
  Cookies.set("accessToken", data.accessToken.jwtToken, {
    expires: addDays(expirationDate, 90),
  });
  Cookies.set("refreshToken", data.refreshToken.token, {
    expires: addDays(expirationDate, 90),
  });
  Cookies.set("authType", "cognito", {
    expires: addDays(expirationDate, 90),
  });
}

export function saveFbCookies(data: FBLoginResponse) {
  const accessTokenExpires = data!.authResponse.expiresIn;
  const currentDate = new Date();

  // Calculate the expiration date
  const expirationDate = new Date();
  expirationDate.setTime(currentDate.getTime() + accessTokenExpires * 1000);

  Cookies.set("accessToken", data.authResponse.accessToken, {
    expires: expirationDate,
  });
  Cookies.set("authType", "facebook", {
    expires: expirationDate,
  });
}

export function clearCookies() {
  Cookies.remove("email");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("authType");
  Cookies.remove("userType");
}
