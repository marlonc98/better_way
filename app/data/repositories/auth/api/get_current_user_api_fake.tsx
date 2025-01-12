import UserEntity from "@/app/domain/entities/user_entity";
import WaiterEntity, { WaiterStatus } from "@/app/domain/entities/waiter_entity";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCurrentUserApiFake = async (keyStorage: string): Promise<WaiterEntity<UserEntity>> => {
    try {
        const user = await AsyncStorage.getItem(keyStorage);
        if (!user) {
            return {
                status: WaiterStatus.SUCCESS,
                data: undefined,
            }
        }
        return {
            status: WaiterStatus.SUCCESS,
            data: JSON.parse(user),
        }
    }
    catch (error) {
        return {
            status: WaiterStatus.ERROR,
            error: "Something went wrong",
        }
    }
}

export default getCurrentUserApiFake;