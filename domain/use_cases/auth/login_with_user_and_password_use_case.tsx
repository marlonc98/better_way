import UserEntity from "@/domain/entities/user_entity";
import WaiterEntity, { WaiterStatus } from "@/domain/entities/waiter_entity";
import AuthRepository from "@/domain/repositories/auth_repository";
import UserProvider from "@/domain/state/user/UserProvider";
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

    call = async (params: {email: String, password: String}): Promise<WaiterEntity<UserEntity>> => {
        const response = await this.authRepository.login(params);
        this.userProvider.Actions.setUser(response.data);
        return response;
    }
}

export const LoginWithUserAndPasswordUseCaseName = "LoginWithUserAndPasswordUseCase";