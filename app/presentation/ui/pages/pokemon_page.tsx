import React from "react";
import { View } from "react-native";
import di from "@/app/dependency_injection";
import PokemonEntity from "@/app/domain/entities/pokemon_entity";
import SearchPokemonsUseCase, { SearchPokemonsUseCaseName } from "@/app/domain/use_cases/pokemon/search_pokemons_use_case";
import CardComponent from "../components/card/card_component";
import routeList from "../../routes/route_list";
import FooterComponent from "../components/footer/footer_component";
import PaginatedList from "../components/paginated_list/paginated_list_component";
import AppBarComponent from "../components/app_bar/app_bar_component";

const PokemonPage = () => {
  const fetchPokemonData = (page: number, itemsPerPage: number) => di.get<SearchPokemonsUseCase>(SearchPokemonsUseCaseName).call({ page, itemsPerPage });
  
  return (
    <View style={{ flex: 1 }}>
      <AppBarComponent title="Pokemons" />
      <PaginatedList<PokemonEntity>
        render={(item: PokemonEntity) => <CardComponent image={item.imageUrl} title={item.name} description={item.description} />}
        fetchData={fetchPokemonData}
        itemsPerPage={10}
      />
      <FooterComponent currentUrl={routeList.pokemons.relativePath} />
    </View>
  );
};

export default PokemonPage;
