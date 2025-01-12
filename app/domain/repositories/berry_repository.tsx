import BerryEntity from "../entities/berry_entity";
import PaginatedEntity from "../entities/paginated_entity";
import WaiterEntity from "../entities/waiter_entity";

export default interface BerryRepository {
    searchBerries: (params: { page: number; itemsPerPage: number; }) => Promise<WaiterEntity<PaginatedEntity<BerryEntity>>>;
}

export const BerryRepositoryName = "BerryRepositoryName";