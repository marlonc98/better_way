import UserEntity from "@/app/domain/entities/user_entity";
import WaiterEntity, { WaiterStatus } from "@/app/domain/entities/waiter_entity";
import AuthRepository from "@/app/domain/repositories/auth_repository";
import loginWithUserAndPasswordApiFake from "./api/login_with_user_and_password_api_fake";
import logoutApiFake from "./api/logout_api_fake";
import getCurrentUserApiFake from "./api/get_current_user_api_fake";

export interface CredentialFake {
    email: string;
    password: string;
    user: UserEntity;
}

const userOnlyPokemon: CredentialFake = {
    email: "pokehunter@mail.com",
    password: "Pikachu123#",
    user: {
        id: 1,
        name: "Ash Ketchum",
        permissions: {
            berries: false,
            pokemons: true,
        },
    }
}
const adminUser: CredentialFake = {
    email: "admin@mail.com",
    password: "Admin123#",
    user: {
        id: 2,
        name: "Professor Oak",
        permissions: {
            berries: true,
            pokemons: true,
        },
    }
}

const users = [userOnlyPokemon, adminUser];

class AuthRepositoryFake implements AuthRepository {
    userStorageKey = "user_data";
    loginWithUserAndPassword = async (params: { email: string; password: string; }): Promise<WaiterEntity<UserEntity>> => loginWithUserAndPasswordApiFake({
        email: params.email,
        password: params.password,
        users,
        keyStorage: this.userStorageKey,
    });
    logout = async (): Promise<void> => logoutApiFake(this.userStorageKey);
    getCurrentUser = async (): Promise<WaiterEntity<UserEntity>> => getCurrentUserApiFake(this.userStorageKey);
}

export default AuthRepositoryFake;