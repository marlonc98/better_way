import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import PokemonEntity from "@/app/domain/entities/pokemon_entity";
import WaiterEntity from "@/app/domain/entities/waiter_entity";

const searchPokemonsApiImpl = async (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<PokemonEntity>>> => {
    throw new Error("Method not implemented.");
}

export default searchPokemonsApiImpl;