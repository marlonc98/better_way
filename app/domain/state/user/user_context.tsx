import React from "react";
import UserContextType from "./user_context_type";

export const defaultUserContext: UserContextType = {
    user: undefined,
    setUser: () => {}
};
const UserContext = React.createContext<UserContextType>(defaultUserContext);

export default UserContext;