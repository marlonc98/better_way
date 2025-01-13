import { Container } from "inversify";
import "reflect-metadata";
import AuthRepository, { AuthRepositoryName } from "./domain/repositories/auth_repository";
import AuthRepositoryFake from "./data/repositories/auth/auth_repository_fake";
import BerryRepository, { BerryRepositoryName } from "./domain/repositories/berry_repository";
import BerryRepositoryFake from "./data/repositories/berry/berry_repository_fake";
import BerryRepositoryDev from "./data/repositories/berry/berry_repository_dev";
import BerryRepositoryImpl from "./data/repositories/berry/berry_repository_impl";
import PokemonRepository, { PokemonRepositoryName } from "./domain/repositories/pokemon_repository";
import PokemonRepositoryFake from "./data/repositories/pokemon/pokemon_repository_fake";
import PokemonRepositoryDev from "./data/repositories/pokemon/pokemon_repository_dev";
import PokemonRepositoryImpl from "./data/repositories/pokemon/pokemon_repository_impl";
import GetCurrentUseCase, { GetCurrentUseCaseName } from "./domain/use_cases/auth/get_current_user_use_case";
import UserProvider, { UserProviderName } from "./domain/state/user/user_provider";
import UserProviderImpl from "./presentation/state/user/user_provider_impl";
import LoginWithUserAndPasswordUseCase, { LoginWithUserAndPasswordUseCaseName } from "./domain/use_cases/auth/login_with_user_and_password_use_case";
import LogoutUseCase, { LogoutUseCaseName } from "./domain/use_cases/auth/logout_use_case";
import SearchBerriesUseCase, { SearchBerriesUseCaseName } from "./domain/use_cases/berry/search_berries_use_case";
import SearchPokemonsUseCase, { SearchPokemonsUseCaseName } from "./domain/use_cases/pokemon/search_pokemons_use_case";

enum MODE_DI { PRODUCTION, DEVELOPMENT, TEST, FAKE }
let mode = MODE_DI.PRODUCTION.toString();
const di = new Container();

if (mode === MODE_DI.FAKE.toString()) {
    di.bind<AuthRepository>(AuthRepositoryName).to(AuthRepositoryFake).inSingletonScope();
    di.bind<BerryRepository>(BerryRepositoryName).to(BerryRepositoryFake).inSingletonScope();
    di.bind<PokemonRepository>(PokemonRepositoryName).to(PokemonRepositoryFake).inSingletonScope();
}else if(mode == MODE_DI.DEVELOPMENT.toString()){
    di.bind<AuthRepository>(AuthRepositoryName).to(AuthRepositoryFake).inSingletonScope();
    di.bind<BerryRepository>(BerryRepositoryName).to(BerryRepositoryDev).inSingletonScope();
    di.bind<PokemonRepository>(PokemonRepositoryName).to(PokemonRepositoryDev).inSingletonScope();
}else {
    di.bind<AuthRepository>(AuthRepositoryName).to(AuthRepositoryFake).inSingletonScope();
    di.bind<BerryRepository>(BerryRepositoryName).to(BerryRepositoryImpl).inSingletonScope();
    di.bind<PokemonRepository>(PokemonRepositoryName).to(PokemonRepositoryImpl).inSingletonScope();
}

// #region PROVIDERS
di.bind<UserProvider>(UserProviderName).toConstantValue(UserProviderImpl);
// #endregion PROVIDERS

// #region USE CASES
// #region Auth use cases
di.bind<GetCurrentUseCase>(GetCurrentUseCaseName).toDynamicValue((context) => {
    return new GetCurrentUseCase({
        authRepository: context.container.get<AuthRepository>(AuthRepositoryName),
        userProvider: context.container.get<UserProvider>(UserProviderName),
    });
}).inSingletonScope();
di.bind<LoginWithUserAndPasswordUseCase>(LoginWithUserAndPasswordUseCaseName).toDynamicValue((context) => {
    return new LoginWithUserAndPasswordUseCase({
        authRepository: context.container.get<AuthRepository>(AuthRepositoryName),
        userProvider: context.container.get<UserProvider>(UserProviderName),
    });
}).inSingletonScope();
di.bind<LogoutUseCase>(LogoutUseCaseName).toDynamicValue((context) => {
    return new LogoutUseCase({
        authRepository: context.container.get<AuthRepository>(AuthRepositoryName),
        userProvider: context.container.get<UserProvider>(UserProviderName),
    });
}).inSingletonScope();
// #endregion Auth use cases

// #region Berry use cases
di.bind<SearchBerriesUseCase>(SearchBerriesUseCaseName).toDynamicValue((context) => {
    return new SearchBerriesUseCase({
        berryRepository: context.container.get<BerryRepository>(BerryRepositoryName),
    });
}).inSingletonScope();
// #endregion Berry use cases

// #region Pokemon use cases
di.bind<SearchPokemonsUseCase>(SearchPokemonsUseCaseName).toDynamicValue((context) => {
    return new SearchPokemonsUseCase({
        pokemonRepository: context.container.get<PokemonRepository>(PokemonRepositoryName),
    });
}).inSingletonScope();
// #endregion Pokemon use cases
// #endregion USE CASES

export default di;
