import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import routeList from "../../routes/route_list";
import FooterComponent from "../components/footer/footer_component";
import di from "@/app/dependency_injection";
import WaiterEntity, { WaiterStatus } from "@/app/domain/entities/waiter_entity";
import PokemonEntity from "@/app/domain/entities/pokemon_entity";
import SearchPokemonsUseCase, { SearchPokemonsUseCaseName } from "@/app/domain/use_cases/pokemon/search_pokemons_use_case";
import Toast from 'react-native-toast-message';
import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import CardComponent from "../components/card/card_component";

const PokemonPage = () => {
    const [data, setData] = useState<WaiterEntity<PaginatedEntity<PokemonEntity>>>({
        status: WaiterStatus.WAITING,
    });
    const canSearch = (data.status === WaiterStatus.SUCCESS || data.status == WaiterStatus.NOT_STARTED) && (data.data == null || data.data.currentPage < data.data.lastPage);
    const itemsPerPage = 10;

    const _handleLoadData = async () => {
        if (!canSearch) return;
        console.log("loading data");
        setData((prev) => ({ ...prev, status: WaiterStatus.WAITING }));
        const response = await di.get<SearchPokemonsUseCase>(SearchPokemonsUseCaseName).call({
            page: data.data?.currentPage ?? 1,
            itemsPerPage,
        });

        if (response.status == WaiterStatus.ERROR) {
            Toast.show({
                type: 'error',
                text1: data.error ?? "Something went wrong",
            });
            setData((prev) => ({ ...prev, status: WaiterStatus.ERROR, error: data.error }));
            return;
        }

        if (data.data == null) {
            setData(response);
            return;
        }

        const mergeData = [...(data.data.items ?? []), ...(response.data?.items ?? [])];
        setData({
            status: WaiterStatus.SUCCESS,
            data: {
                ...response.data!,
                items: mergeData,
            }
        });
    }

    const _handleResetLoader = () => {
        setData({
            status: WaiterStatus.NOT_STARTED,
            data: undefined,
        });
        _handleLoadData();
    }

    useEffect(() => {
        _handleLoadData();
    }, []);

    return <View style={styles.screen}>
        <View style={styles.header}>
            <Text style={styles.title}>Pokemons</Text>
        </View>
        <View style={styles.body}>
            {data.data && data.data.items.length > 0 && <FlatList
                data={data.data?.items ?? []}
                renderItem={(item) => <CardComponent image={(item.item as PokemonEntity).imageUrl} title={(item.item as PokemonEntity).name} />}
                onEndReached={_handleLoadData}
                keyExtractor={(item, index) => index.toString()}
            />}
            {data.status == WaiterStatus.ERROR && <View style={styles.centred}>
                <Text style={styles.errorTitle}>{data.error ?? "Something went wrong"}</Text>
                <Text>You can retry by clicking on the button below! </Text>
                <Button title="Retry" onPress={_handleResetLoader} />
            </View>}
            {data.status == WaiterStatus.WAITING && <View style={(data.data?.items ?? []).length == 0 ? styles.centred : {}}>
                <Button title="Loading..." disabled />
            </View>}
        </View>
        <FooterComponent currentUrl={routeList.pokemons.relativePath} />
    </View>

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    header: {
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: 'black',
    },
    body: {
        flex: 1,
    },
    centred: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorTitle: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    },
});

export default PokemonPage