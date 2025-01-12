import React, { FC, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, Button, ActivityIndicator } from "react-native";
import WaiterEntity, { WaiterStatus } from "@/app/domain/entities/waiter_entity";
import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import Toast from "react-native-toast-message";
import PaginatedListProps from "./paginated_list_component_props";

const PaginatedList = <T,>({ render, fetchData, itemsPerPage = 10 }: PaginatedListProps<T>) => {
    const [data, setData] = useState<WaiterEntity<PaginatedEntity<T>>>({
        status: WaiterStatus.NOT_STARTED,
    });

    const canSearch =
        (data.status === WaiterStatus.SUCCESS || data.status === WaiterStatus.NOT_STARTED) &&
        (data.data == null || data.data.currentPage < data.data.lastPage);

    const handleLoadData = async () => {
        if (!canSearch) return;

        setData((prev) => ({ ...prev, status: WaiterStatus.WAITING }));
        const response = await fetchData(data.data?.currentPage ?? 1, itemsPerPage);

        if (response.status === WaiterStatus.ERROR) {
            Toast.show({
                type: "error",
                text1: response.error ?? "Something went wrong",
            });
            setData((prev) => ({ ...prev, status: WaiterStatus.ERROR, error: response.error }));
            return;
        }

        if (data.data == null) {
            setData(response);
            return;
        }

        const mergedData = [...(data.data.items ?? []), ...(response.data?.items ?? [])];
        setData({
            status: WaiterStatus.SUCCESS,
            data: {
                ...response.data!,
                items: mergedData,
            },
        });
    };

    const handleResetLoader = () => {
        setData({
            status: WaiterStatus.NOT_STARTED,
            data: undefined,
        });
        handleLoadData();
    };

    useEffect(() => {
        handleLoadData();
    }, []);

    return (
        <View style={styles.screen}>
            <View style={styles.body}>
                {data.data && data.data.items.length > 0 && (
                    <FlatList
                        data={data.data.items}
                        renderItem={({ item }) => render(item)}
                        onEndReached={handleLoadData}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={data.status === WaiterStatus.WAITING ? <Button title="Loading..." disabled /> : null}
                        keyExtractor={(_, index) => index.toString()}
                    />
                )}
                {data.status === WaiterStatus.ERROR && (
                    <View style={styles.centered}>
                        <Text style={styles.errorTitle}>{data.error ?? "Something went wrong"}</Text>
                        <Text>You can retry by clicking the button below!</Text>
                        <Button title="Retry" onPress={handleResetLoader} />
                    </View>
                )}
                {data.status === WaiterStatus.WAITING && (data.data == null || data.data.items.length == 0) &&
                    < View style={styles.centered}>
                        <ActivityIndicator />
                        <Button title="Loading" disabled />
                    </View>}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorTitle: {
        fontSize: 16,
        color: "red",
        marginBottom: 10,
    },
});

export default PaginatedList;
