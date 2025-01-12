import UserEntity from "@/app/domain/entities/user_entity";
import WaiterEntity, { WaiterStatus } from "@/app/domain/entities/waiter_entity";
import AuthRepository from "@/app/domain/repositories/auth_repository";
import UserProvider from "@/app/domain/state/user/UserProvider";
import { injectable } from "inversify";

interface _Props {
    userProvider: UserProvider;
    authRepository: AuthRepository;
}

@injectable()
export default class LogoutUseCase {
    private userProvider: UserProvider;
    private authRepository: AuthRepository
    constructor(private props: _Props) {
        this.userProvider = props.userProvider;
        this.authRepository = props.authRepository;
    }

    call = async (): Promise<void> => {
        await this.authRepository.logout();
        this.userProvider.Actions.setUser(null);
    }
}

export const LogoutUseCaseName = "LogoutUseCase";