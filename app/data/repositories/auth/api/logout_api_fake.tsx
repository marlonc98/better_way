import Testing from "@/utils/Testing";
import AsyncStorage from '@react-native-async-storage/async-storage';

const logoutApiFake = async (keyStorage: string): Promise<void> => {
    try {
        await Testing.sleeper(1000);
        await AsyncStorage.removeItem(keyStorage);
    }
    catch (error) {
        console.log(error)
    }
}

export default logoutApiFake;