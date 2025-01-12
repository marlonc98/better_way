import Provider from "../Provider";
import UserContextType from "./user_context_type";

export default interface UserProvider extends Provider<UserContextType>{
}

export const UserProviderName = 'UserProvider';