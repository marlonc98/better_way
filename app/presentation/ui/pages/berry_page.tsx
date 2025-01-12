import React from "react";
import { View } from "react-native";
import di from "@/app/dependency_injection";
import BerryEntity from "@/app/domain/entities/berry_entity";
import CardComponent from "../components/card/card_component";
import routeList from "../../routes/route_list";
import FooterComponent from "../components/footer/footer_component";
import PaginatedList from "../components/paginated_list/paginated_list_component";
import SearchBerriesUseCase, { SearchBerriesUseCaseName } from "@/app/domain/use_cases/berry/search_berries_use_case";

const fetchBerryData = async (page: number, itemsPerPage: number) => {
  const useCase = di.get<SearchBerriesUseCase>(SearchBerriesUseCaseName);
  return useCase.call({ page, itemsPerPage });
};

const BerryPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <PaginatedList<BerryEntity>
        render={(item: BerryEntity) => <CardComponent image={item.imageUrl} title={item.name} />}
        fetchData={fetchBerryData}
        itemsPerPage={10}
      />
      <FooterComponent currentUrl={routeList.berries.relativePath} />
    </View>
  );
};

export default BerryPage;
