import UserEntity from "../entities/user_entity";
import WaiterEntity from "../entities/waiter_entity";

export default interface AuthRepository {
    loginWithUserAndPassword: (params: { email: string; password: string; }) => Promise<WaiterEntity<UserEntity>>;
    logout: () => Promise<void>;
    getCurrentUser: () => Promise<WaiterEntity<UserEntity>>;
}

export const AuthRepositoryName = "AuthRepository";