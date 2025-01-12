import { FC, useContext } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import FooterComponentProps from "./footer_component_props";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserContext from "@/app/domain/state/user/user_context";
import UserContextType from "@/app/domain/state/user/user_context_type";
import { useNavigation } from "expo-router";
import routeList from "@/app/presentation/routes/route_list";

const FooterComponent: FC<FooterComponentProps> = ({ currentUrl }) => {
    const { user } = useContext(UserContext) as UserContextType;
    const navigation = useNavigation();
    const routes: { route: typeof routeList[keyof typeof routeList], icon: "cat" | "fruit-cherries" }[] = [
        {
            route: routeList.pokemons,
            icon: 'cat',
        },
        {
            route: routeList.berries,
            icon: 'fruit-cherries',
        },
    ]
    if (!user) return <View>
        <Text>--{JSON.stringify(user)}</Text>
    </View>
    return <View style={styles.bottomNavigation}>
        {routes.filter(route => route.route.auth(user)).map(route =>
            <TouchableOpacity
                key={route.route.relativePath}
                style={{ ...styles.navButton}}
                onPress={() => navigation.navigate(route.route.relativePath as never)}>
                <MaterialCommunityIcons name={route.icon} size={30} color={currentUrl === route.route.relativePath ? 'red' : 'gray'} />
                <Text style={{ ...styles.navLabel, color: currentUrl === route.route.relativePath ? 'red' : 'gray' }}>{route.route.title}</Text>
                </TouchableOpacity>
        )}

        <TouchableOpacity
            style={styles.navButton}
            onPress={() => console.log('Settings')}
        >
            <Image src={user!.imageUrl} style={{ width: 30, height: 30, borderRadius: 15 }} />
            <Text style={{...styles.navLabel,color: currentUrl === routeList.settings.relativePath ? 'red' : 'gray' }}>Settings</Text>
        </TouchableOpacity>
    </View>

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    navButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    navLabel: {
        fontSize: 12,
        color: 'gray',
    },
});


export default FooterComponent;