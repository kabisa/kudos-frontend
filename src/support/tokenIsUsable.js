import jwtDecode from "jwt-decode";

export const tokenIsUsable = (tokenString, currentDate) => {
  return !!tokenString && !tokenWillExpire(tokenString, currentDate);
};

const tokenWillExpire = (tokenString, currentDate, margin = 60 * 1000) => {
  return expirationTime(tokenString) - margin < currentDate.getTime();
};

const expirationTime = tokenString => {
  try {
    return jwtDecode(tokenString).expires_in * 1000;
  } catch (e) {
    if (e instanceof jwtDecode.InvalidTokenError) {
      return Number.MIN_SAFE_INTEGER;
    } else {
      throw e;
    }
  }
};
