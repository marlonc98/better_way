import BerryEntity from "@/app/domain/entities/berry_entity";
import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import WaiterEntity, { WaiterStatus } from "@/app/domain/entities/waiter_entity";
import BerryRepository from "@/app/domain/repositories/berry_repository";
import Testing from "@/utils/Testing";
import { injectable } from "inversify";

const berry: BerryEntity = {
    id: 1,
    name: "cheri",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png",
}

const berry2: BerryEntity = {
    id: 2,
    name: "chesto",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/chesto-berry.png",
}

const berry3: BerryEntity = {
    id: 3,
    name: "pecha",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pecha-berry.png",
}

@injectable()
class BerryRepositoryFake implements BerryRepository {
    searchBerries = async (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<BerryEntity>>> => {
        await Testing.sleeper(500);
        const maxPage = 3;
        if (params.page >= maxPage) {
            return {
                status: WaiterStatus.SUCCESS,
                data: {
                    currentPage: params.page,
                    items: [],
                    itemsPerPage: params.itemsPerPage,
                    lastPage: maxPage,
                    total: maxPage * params.itemsPerPage
                }
            }
        }
        return {
            status: WaiterStatus.SUCCESS,
            data: {
                currentPage: params.page,
                items: Array.from({ length: params.itemsPerPage }, (_, i) => i).map((i) => i % 3 === 0 ? berry : i % 3 === 1 ? berry2 : berry3),
                itemsPerPage: params.itemsPerPage,
                lastPage: maxPage,
                total: maxPage * params.itemsPerPage
            }
        }
    }
}

export default BerryRepositoryFake;