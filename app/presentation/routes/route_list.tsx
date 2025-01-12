import UserEntity from "@/app/domain/entities/user_entity";
import LoadPage from "../ui/pages/load_page";
import PokemonPage from "../ui/pages/pokemon_page";
import LoginPage from "../ui/pages/login_page";
import BerryPage from "../ui/pages/berry_page";

const routeList = {
    load: {
        relativePath: "/",
        title: undefined,
        component: LoadPage,
        pathTo: (): string => `/`,
        auth: (user: UserEntity | undefined | null) => true,
    },
    pokemons: {
        relativePath: "/pokemons",
        title: "Pokemons",
        component: PokemonPage,
        pathTo: (): string => `/pokemons`,
        auth: (user: UserEntity | undefined | null) => user?.permissions.pokemons,
    },
    berries: {
        relativePath: "/berries",
        title: "Berries",
        component: BerryPage,
        pathTo: (): string => `/berries`,
        auth: (user: UserEntity | undefined | null) => user?.permissions.berries,
    },
    login: {
        relativePath: "/login",
        title: "Login",
        component: LoginPage,
        pathTo: (): string => `/login`,
        auth: (user: UserEntity | undefined | null) => !user,
    },
    settings: {
        relativePath: "/settings",
        title: "Settings",
        component: LoadPage,
        pathTo: (): string => `/settings`,
        auth: (user: UserEntity | undefined) => true,
    }
};

export default routeList;