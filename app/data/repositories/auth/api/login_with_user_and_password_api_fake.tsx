import Testing from "@/utils/Testing";
import { CredentialFake } from "../auth_repository_fake";
import WaiterEntity, { WaiterStatus } from "@/app/domain/entities/waiter_entity";
import UserEntity from "@/app/domain/entities/user_entity";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        await AsyncStorage.setItem(keyStorage, JSON.stringify(user.user));
        return {
            status: WaiterStatus.SUCCESS,
            data: user.user,
        }
    }catch (error) {
        console.error(error);
        return {
            status: WaiterStatus.ERROR,
            error: "Something went wrong",
        }
    }
}

export default loginWithUserAndPasswordApiFake;