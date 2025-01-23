import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  setIsLoggedIn: () => {},
});

export default AuthContext;
