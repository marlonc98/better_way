import BerryRepository from "@/app/domain/repositories/berry_repository";
import BerryRepositoryFake from "./berry_repository_fake";
import { injectable } from "inversify";

@injectable()
class BerryRepositoryDev implements BerryRepository {
    fakeRepository = new BerryRepositoryFake();

    searchBerries = (params: { page: number; itemsPerPage: number; }) => this.fakeRepository.searchBerries(params);
}

export default BerryRepositoryDev;