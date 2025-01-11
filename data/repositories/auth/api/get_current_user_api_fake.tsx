import UserEntity from "@/domain/entities/user_entity";
import WaiterEntity, { WaiterStatus } from "@/domain/entities/waiter_entity";

const getCurrentUserApiFake = async (keyStorage: string): Promise<WaiterEntity<UserEntity>> => {
    try {
        const user = localStorage.getItem(keyStorage);
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