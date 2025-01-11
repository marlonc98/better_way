import BerryEntity from "@/domain/entities/berry_entity";
import PaginatedEntity from "@/domain/entities/paginated_entity";
import WaiterEntity from "@/domain/entities/waiter_entity";
import BerryRepository from "@/domain/repositories/berry_repository";
import { injectable } from "inversify";

interface _Props {
    berryRepository: BerryRepository;
}

@injectable()
export default class SearchBerriesUseCase {
    private berryRepository: BerryRepository
    constructor(private props: _Props) {
        this.berryRepository = props.berryRepository;
    }

    call = async (params: {
        page: number, itemsPerPage: number
    }): Promise<WaiterEntity<PaginatedEntity<BerryEntity>>> => {
        return await this.berryRepository.searchBerries(params);
    }
}

export const SearchBerriesUseCaseName = "SearchBerriesUseCase";