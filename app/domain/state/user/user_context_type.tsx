import UserEntity from "../../entities/user_entity";

type UserContextType = {
  user: UserEntity | undefined;
  setUser: (user: UserEntity | undefined) => void;
};


export default UserContextType;