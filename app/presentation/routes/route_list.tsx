import UserEntity from "@/app/domain/entities/user_entity";
import LoadPage from "../ui/pages/load_page";
import PokemonPage from "../ui/pages/pokemon_page";
import LoginPage from "../ui/pages/login_page";

const routeList = {
    load: {
        relativePath: "/",
        title: undefined,
        component: LoadPage,
        pathTo: (): string => `/`,
        auth: (user: UserEntity | undefined) => true,
    },
    pokemons: {
        relativePath: "/pokemons",
        title: "Pokemons",
        component: PokemonPage,
        pathTo: (): string => `/pokemons`,
        auth: (user: UserEntity | undefined) => user?.permissions.pokemons,
    },
    // berries: {
    //     path: "/berries",
    //     relativePath: "/berries",
    //     component: <div>berries</div>,
    //     pathTo: (): string => `/berries`,
    //     auth: (user: UserEntity | undefined) => user?.permissions.berries,
    // },
    login: {
        relativePath: "/login",
        title: "Login",
        component: LoginPage,
        pathTo: (): string => `/login`,
        auth: (user: UserEntity | undefined) => !user,
    },
    // settings: {
    //     path: "/settings",
    //     relativePath: "/settings",
    //     component: <div>settings</div>,
    //     pathTo: (): string => `/settings`,
    //     auth: (user: UserEntity | undefined) => true,
    // }
};

export default routeList;