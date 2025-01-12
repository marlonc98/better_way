import UserEntity from "@/app/domain/entities/user_entity";
import WaiterEntity, { WaiterStatus } from "@/app/domain/entities/waiter_entity";
import AuthRepository from "@/app/domain/repositories/auth_repository";
import UserProvider from "@/app/domain/state/user/user_provider";
import { injectable } from "inversify";

interface _Props {
    userProvider: UserProvider;
    authRepository: AuthRepository;
}

@injectable()
export default class GetCurrentUseCase {
    private userProvider: UserProvider;
    private authRepository: AuthRepository
    constructor(private props: _Props) {
        this.userProvider = props.userProvider;
        this.authRepository = props.authRepository;
    }

    call = async (): Promise<WaiterEntity<UserEntity>> => {
        const response = await this.authRepository.getCurrentUser();
        console.log("GetCurrentUseCase", response);
        this.userProvider.Actions.setUser(response.data);
        console.log("GetCurrentUseCase provider", this.userProvider.Actions.user);
        return response;
    }
}

export const GetCurrentUseCaseName = "GetCurrentUseCase";