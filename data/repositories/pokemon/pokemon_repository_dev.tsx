import PaginatedEntity from "@/domain/entities/paginated_entity";
import PokemonEntity from "@/domain/entities/pokemon_entity";
import WaiterEntity from "@/domain/entities/waiter_entity";
import PokemonRepositoryFake from "./pokemon_repository_fake";
import PokemonRepository from "@/domain/repositories/pokemon_repository";

class PokemonRepositoryDev implements PokemonRepository {
    fakeRepository = new PokemonRepositoryFake();
    searchPokemons = (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<PokemonEntity>>> => this.fakeRepository.searchPokemons(params);
}

export default PokemonRepositoryDev;