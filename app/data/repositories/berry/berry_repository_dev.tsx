import BerryRepositoryFake from "./berry_repository_fake";
import { injectable } from "inversify";
import searchBerriesApiImpl from "./api/search_berries_api_impl";
import WaiterEntity from "@/app/domain/entities/waiter_entity";
import BerryEntity from "@/app/domain/entities/berry_entity";
import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import BerryRepository from "@/app/domain/repositories/berry_repository";

@injectable()
class BerryRepositoryDev implements BerryRepository {
    // fakeRepository = new BerryRepositoryFake();
    searchBerries = (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<BerryEntity>>> => searchBerriesApiImpl(params);
}

export default BerryRepositoryDev;