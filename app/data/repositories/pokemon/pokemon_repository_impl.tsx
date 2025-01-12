import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import PokemonEntity from "@/app/domain/entities/pokemon_entity";
import WaiterEntity from "@/app/domain/entities/waiter_entity";
import { injectable } from "inversify";
import searchPokemonsApiImpl from "./api/search_pokemons_api_impl";
import PokemonRepository from "@/app/domain/repositories/pokemon_repository";

@injectable()
class PokemonRepositoryImpl implements PokemonRepository {
    searchPokemons = (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<PokemonEntity>>> => searchPokemonsApiImpl(params);
}

export default PokemonRepositoryImpl;