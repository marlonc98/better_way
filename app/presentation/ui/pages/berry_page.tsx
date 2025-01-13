import React from "react";
import { View } from "react-native";
import di from "@/app/dependency_injection";
import BerryEntity from "@/app/domain/entities/berry_entity";
import CardComponent from "../components/card/card_component";
import routeList from "../../routes/route_list";
import FooterComponent from "../components/footer/footer_component";
import PaginatedList from "../components/paginated_list/paginated_list_component";
import SearchBerriesUseCase, { SearchBerriesUseCaseName } from "@/app/domain/use_cases/berry/search_berries_use_case";
import AppBarComponent from "../components/app_bar/app_bar_component";


const BerryPage = () => {
  const fetchBerryData = (page: number, itemsPerPage: number) => di.get<SearchBerriesUseCase>(SearchBerriesUseCaseName).call({ page, itemsPerPage });
  return (
    <View style={{ flex: 1 }}>
      <AppBarComponent title="Berries" />
      <PaginatedList<BerryEntity>
        render={(item: BerryEntity) => <CardComponent height={100} image={item.imageUrl} title={item.name} />}
        fetchData={fetchBerryData}
        itemsPerPage={10}
        numColumns={2}
      />
      <FooterComponent currentUrl={routeList.berries.relativePath} />
    </View>
  );
};

export default BerryPage;
