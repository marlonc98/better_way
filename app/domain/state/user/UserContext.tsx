import React from "react";
import UserContextType from "./UserContextType";

export const defaultUserContext: UserContextType = {
    user: undefined,
    setUser: () => {}
};
const UserContext = React.createContext<UserContextType>(defaultUserContext);

export default UserContext;