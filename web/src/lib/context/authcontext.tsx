import { createContext } from "react"

const userContext = createContext({
    userID: 0,
    setUserID: (val:number) => {},
    isLoggedIn:false,
    setLoggedIn:(val:boolean) => {}
  });

export default userContext