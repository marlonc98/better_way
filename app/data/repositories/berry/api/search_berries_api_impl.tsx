import BerryEntity from "@/app/domain/entities/berry_entity";
import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import WaiterEntity from "@/app/domain/entities/waiter_entity";

const searchBerriesApiImpl = (params: { page: number; itemsPerPage: number; }): Promise<WaiterEntity<PaginatedEntity<BerryEntity>>> => {
    throw new Error("Method not implemented.");
}

export default searchBerriesApiImpl;