import PaginatedEntity from "../entities/paginated_entity";
import PokemonEntity from "../entities/pokemon_entity";
import WaiterEntity from "../entities/waiter_entity";

export default interface PokemonRepository {
    searchPokemons: (params: { page: number; itemsPerPage: number; }) => Promise<WaiterEntity<PaginatedEntity<PokemonEntity>>>;
}