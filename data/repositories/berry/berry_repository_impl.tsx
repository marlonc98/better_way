import BerryEntity from "@/domain/entities/berry_entity";
import PaginatedEntity from "@/domain/entities/paginated_entity";
import WaiterEntity from "@/domain/entities/waiter_entity";
import BerryRepository from "@/domain/repositories/berry_repository";
import searchBerriesApiImpl from "./api/search_berries_api_impl";
import { injectable } from "inversify";

@injectable()
class BerryRepositoryImpl implements BerryRepository {
    searchBerries = (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<BerryEntity>>> => searchBerriesApiImpl(params);
}

export default BerryRepositoryImpl;