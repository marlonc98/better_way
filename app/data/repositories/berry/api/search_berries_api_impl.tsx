import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import BerryEntity from "@/app/domain/entities/berry_entity";
import WaiterEntity, { WaiterStatus } from "@/app/domain/entities/waiter_entity";
import BerryDto from "@/app/data/dto/berry_dto";

const _getBerryById = async (id: number): Promise<BerryEntity | undefined> => {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/berry/${id}`);
        const data = await response.json();
        return BerryDto.fromJSON(data);
    }catch(e){
        return undefined;
    }
}
    
const searchBerriesApiImpl = async (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<BerryEntity>>> => {
    try{
        const offset = (params.page - 1) * params.itemsPerPage;
        const limit = params.page * params.itemsPerPage;
        // call and waita from _getBerryById
        const berriesResponse = await Promise.all(
            Array.from({ length: limit - offset }, (_, i) => offset + i + 1).map(async id => await _getBerryById(id))
        );
        const berries = berriesResponse.filter(berry => berry !== undefined) as BerryEntity[];
        const berriesSorted = berries.sort((a, b) => a.id - b.id);
        const totalBerries = 1118;
        return {
            data: {
                items: berriesSorted,
                currentPage: params.page,
                itemsPerPage: params.itemsPerPage,
                total: totalBerries,
                lastPage: Math.ceil(totalBerries / params.itemsPerPage)
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

export default searchBerriesApiImpl;