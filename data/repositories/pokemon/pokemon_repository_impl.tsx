import PaginatedEntity from "@/domain/entities/paginated_entity";
import PokemonEntity from "@/domain/entities/pokemon_entity";
import WaiterEntity from "@/domain/entities/waiter_entity";
import { injectable } from "inversify";
import searchPokemonsApiImpl from "./api/search_pokemons_api_impl";
import PokemonRepository from "@/domain/repositories/pokemon_repository";

@injectable()
class PokemonRepositoryImpl implements PokemonRepository {
    searchPokemons = (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<PokemonEntity>>> => searchPokemonsApiImpl(params);
}

export default PokemonRepositoryImpl;