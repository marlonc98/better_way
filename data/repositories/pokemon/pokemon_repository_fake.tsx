import PaginatedEntity from "@/domain/entities/paginated_entity";
import PokemonEntity from "@/domain/entities/pokemon_entity";
import WaiterEntity, { WaiterStatus } from "@/domain/entities/waiter_entity";
import PokemonRepository from "@/domain/repositories/pokemon_repository";
import Testing from "@/utils/Testing";

const pikachu: PokemonEntity = {
    id: 1,
    name: "Pikachu",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
}

const charmander: PokemonEntity = {
    id: 2,
    name: "Charmander",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
}

const bulbasaur: PokemonEntity = {
    id: 3,
    name: "Bulbasaur",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
}

class PokemonRepositoryFake implements PokemonRepository {
    searchPokemons = async (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<PokemonEntity>>> => {
        await Testing.sleeper(1000);
        const maxPage = 3;
        if (params.page >= maxPage) {
            return {
                status: WaiterStatus.SUCCESS,
                data: {
                    currentPage: params.page,
                    data: [],
                    itemsPerPage: params.itemsPerPage,
                    lastPage: maxPage,
                    total: maxPage * params.itemsPerPage
                }
            }
        }

        return {
            status: WaiterStatus.SUCCESS,
            data: {
                currentPage: params.page,
                data: Array.from({ length: params.itemsPerPage }, (_, i) => i).map((i) => i % 3 === 0 ? pikachu : i % 3 === 1 ? charmander : bulbasaur),
                itemsPerPage: params.itemsPerPage,
                lastPage: maxPage,
                total: maxPage * params.itemsPerPage
            }
        }
    }
}

export default PokemonRepositoryFake;