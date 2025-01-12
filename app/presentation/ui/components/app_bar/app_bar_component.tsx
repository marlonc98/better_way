import { FC } from "react";
import AppBarComponentProps from "./app_bar_component_props";
import { Text, View, StyleSheet } from "react-native";

const AppBarComponent:FC<AppBarComponentProps> = ({ title }) => {
    return <View style={styles.appBar}>
        <Text style={styles.appBarText}>{title}</Text>
    </View>
}

const styles = StyleSheet.create({
    appBar: {
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appBarText: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default AppBarComponent;