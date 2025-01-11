import PaginatedEntity from "@/domain/entities/paginated_entity";
import PokemonEntity from "@/domain/entities/pokemon_entity";
import WaiterEntity from "@/domain/entities/waiter_entity";

const searchPokemonsApiImpl = async (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<PokemonEntity>>> => {
    throw new Error("Method not implemented.");
}

export default searchPokemonsApiImpl;