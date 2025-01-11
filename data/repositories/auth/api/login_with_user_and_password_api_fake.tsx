import Testing from "@/utils/Testing";
import { CredentialFake } from "../auth_repository_fake";
import WaiterEntity, { WaiterStatus } from "@/domain/entities/waiter_entity";
import UserEntity from "@/domain/entities/user_entity";

const loginWithUserAndPasswordApiFake = async (params: { email: string; password: string; users: CredentialFake[], keyStorage: string }): Promise<WaiterEntity<UserEntity>> => {
    try {
        const { email, password, users, keyStorage } = params;
        await Testing.sleeper(1000);
        const user = users.find((user) => user.email === email && user.password === password);
        if (!user) {
            return {
                status: WaiterStatus.ERROR,
                error: "Invalid credentials",
            }
        }
        localStorage.setItem(keyStorage, JSON.stringify(user.user));
        return {
            status: WaiterStatus.SUCCESS,
            data: user.user,
        }
    }catch (error) {
        return {
            status: WaiterStatus.ERROR,
            error: "Something went wrong",
        }
    }
}

export default loginWithUserAndPasswordApiFake;