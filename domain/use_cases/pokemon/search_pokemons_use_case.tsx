import PaginatedEntity from "@/domain/entities/paginated_entity";
import PokemonEntity from "@/domain/entities/pokemon_entity";
import WaiterEntity from "@/domain/entities/waiter_entity";
import PokemonRepository from "@/domain/repositories/pokemon_repository";
import { injectable } from "inversify";

interface _Props {
    pokemonRepository: PokemonRepository;
}

@injectable()
export default class SearchPokemonsUseCase {
    private pokemonRepository: PokemonRepository
    constructor(private props: _Props) {
        this.pokemonRepository = props.pokemonRepository;
    }

    call = async (params: {
        page: number, itemsPerPage: number
    }): Promise<WaiterEntity<PaginatedEntity<PokemonEntity>>> => {
        return await this.pokemonRepository.searchPokemons(params);
    }
}

export const SearchPokemonsUseCaseName = "SearchPokemonsUseCase";