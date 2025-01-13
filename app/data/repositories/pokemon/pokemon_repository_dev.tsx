import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import PokemonEntity from "@/app/domain/entities/pokemon_entity";
import WaiterEntity from "@/app/domain/entities/waiter_entity";
import PokemonRepositoryFake from "./pokemon_repository_fake";
import PokemonRepository from "@/app/domain/repositories/pokemon_repository";
import searchPokemonsApiImpl from "./api/search_pokemons_api_impl";

class PokemonRepositoryDev implements PokemonRepository {
    fakeRepository = new PokemonRepositoryFake();
    searchPokemons = (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<PokemonEntity>>> => searchPokemonsApiImpl(params);
}

export default PokemonRepositoryDev;