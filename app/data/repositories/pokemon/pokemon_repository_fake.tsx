import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import PokemonEntity from "@/app/domain/entities/pokemon_entity";
import WaiterEntity, { WaiterStatus } from "@/app/domain/entities/waiter_entity";
import PokemonRepository from "@/app/domain/repositories/pokemon_repository";
import Testing from "@/utils/Testing";

const pikachu: PokemonEntity = {
    id: 1,
    name: "Pikachu",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    description: "Pikachu is an Electric-type Pokémon introduced in Generation I. It evolves from Pichu when leveled up with high friendship and evolves into Raichu when exposed to a Thunder Stone. However, the starter Pikachu in Pokémon Yellow will refuse to evolve into Raichu unless it is traded and evolved on another save file."
}

const charmander: PokemonEntity = {
    id: 2,
    name: "Charmander",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    description: "Charmander is a Fire-type Pokémon introduced in Generation I. It evolves into Charmeleon starting at level 16, which evolves into Charizard starting at level 36."
}

const bulbasaur: PokemonEntity = {
    id: 3,
    name: "Bulbasaur",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    description: "Bulbasaur is a Grass/Poison-type Pokémon introduced in Generation I. It evolves into Ivysaur starting at level 16, which evolves into Venusaur starting at level 32."
}

class PokemonRepositoryFake implements PokemonRepository {
    searchPokemons = async (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<PokemonEntity>>> => {
        await Testing.sleeper(500);
        const maxPage = 3;
        if (params.page >= maxPage) {
            return {
                status: WaiterStatus.SUCCESS,
                data: {
                    currentPage: params.page,
                    items: [],
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
                items: Array.from({ length: params.itemsPerPage }, (_, i) => i).map((i) => i % 3 === 0 ? pikachu : i % 3 === 1 ? charmander : bulbasaur),
                itemsPerPage: params.itemsPerPage,
                lastPage: maxPage,
                total: maxPage * params.itemsPerPage
            }
        }
    }
}

export default PokemonRepositoryFake;