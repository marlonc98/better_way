import Testing from "@/utils/Testing";

const logoutApiFake = async (keyStorage: string): Promise<void> => {
    try {
        await Testing.sleeper(1000);
        localStorage.removeItem(keyStorage);
    }
    catch (error) {
        console.log(error)
    }
}

export default logoutApiFake;