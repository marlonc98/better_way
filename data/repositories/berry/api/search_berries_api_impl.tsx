import BerryEntity from "@/domain/entities/berry_entity";
import PaginatedEntity from "@/domain/entities/paginated_entity";
import WaiterEntity from "@/domain/entities/waiter_entity";

const searchBerriesApiImpl = (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<BerryEntity>>> => {
    throw new Error("Method not implemented.");
}

export default searchBerriesApiImpl;