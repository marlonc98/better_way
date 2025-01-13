import PokemonDto from "@/app/data/dto/pokemon_dto";
import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import PokemonEntity from "@/app/domain/entities/pokemon_entity";
import WaiterEntity, { WaiterStatus } from "@/app/domain/entities/waiter_entity";

const _getPokemonById = async (id: number): Promise<PokemonEntity | undefined> => {
    try{
        console.log("get url pokemon", `https://pokeapi.co/api/v2/pokemon/${id}`);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return PokemonDto.fromJSON(data);
    }catch(e){
        return undefined;
    }
}
    
const searchPokemonsApiImpl = async (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<PokemonEntity>>> => {
    try{
        const offset = (params.page - 1) * params.itemsPerPage;
        const limit = params.page * params.itemsPerPage;
        // call and waita from _getPokemonById
        const pokemonsResponse = await Promise.all(
            Array.from({ length: limit - offset }, (_, i) => offset + i + 1).map(async id => await _getPokemonById(id))
        );
        const pokemons = pokemonsResponse.filter(pokemon => pokemon !== undefined) as PokemonEntity[];
        const pokemonsSorted = pokemons.sort((a, b) => a.id - b.id);
        const totalPokemons = 1118;
        return {
            data: {
                items: pokemonsSorted,
                currentPage: params.page,
                itemsPerPage: params.itemsPerPage,
                total: totalPokemons,
                lastPage: Math.ceil(totalPokemons / params.itemsPerPage)
            },
            status: WaiterStatus.SUCCESS,
        }
    }catch(e){
        return {
            data: {
                items: [],
                currentPage: params.page,
                itemsPerPage: params.itemsPerPage,
                total: 0,
                lastPage: 0
            },
            status: WaiterStatus.ERROR,
        }
    }
}

export default searchPokemonsApiImpl;