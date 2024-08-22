const toBoolean = (str) => {
    const lowerStr = (str || "").toLowerCase();
    return lowerStr === "1" || lowerStr.startsWith("t");
  };
  
  // 디폴트: "http://localhost:8000/
  const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8000";
  
  // 0 : no timeout
  const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT) || 0;
  
  const API_WITH_CREDENTIALS = toBoolean(
    process.env.REACT_APP_API_WITH_CREDENTIALS,
  );
  
  const LOGIN_URL =
    process.env.REACT_APP_LOGIN_URL || `${API_HOST}/accounts/login/`;
  const LOGOUT_URL =
    process.env.REACT_APP_LOGOUT_URL || `${API_HOST}/accounts/logout/`;
  const SIGNUP_URL =
    process.env.REACT_APP_LOGIN_URL || `${API_HOST}/accounts/signup/`;
  const PROFILE_URL =
    process.env.REACT_APP_LOGIN_URL || `${API_HOST}/accounts/profile/`;
  
  export {
    API_HOST,
    API_TIMEOUT,
    API_WITH_CREDENTIALS,
    LOGIN_URL,
    LOGOUT_URL,
    SIGNUP_URL,
    PROFILE_URL,
  };