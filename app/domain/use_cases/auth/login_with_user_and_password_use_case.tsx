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
export default class LoginWithUserAndPasswordUseCase {
    private userProvider: UserProvider;
    private authRepository: AuthRepository
    constructor(private props: _Props) {
        this.userProvider = props.userProvider;
        this.authRepository = props.authRepository;
    }

    call = async (params: {email: string, password: string}): Promise<WaiterEntity<UserEntity>> => {
        const response = await this.authRepository.loginWithUserAndPassword(params);
        this.userProvider.Actions.setUser(response.data);
        return response;
    }
}

export const LoginWithUserAndPasswordUseCaseName = "LoginWithUserAndPasswordUseCase";