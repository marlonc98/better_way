import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import PokemonEntity from "@/app/domain/entities/pokemon_entity";
import WaiterEntity from "@/app/domain/entities/waiter_entity";
import PokemonRepository from "@/app/domain/repositories/pokemon_repository";
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