import UserContext from "@/app/domain/state/user/user_context";
import UserContextType from "@/app/domain/state/user/user_context_type"
import { useContext, useState } from "react"
import { Image, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import FooterComponent from "../components/footer/footer_component";
import routeList from "../../routes/route_list";
import di from "@/app/dependency_injection";
import LogoutUseCase, { LogoutUseCaseName } from "@/app/domain/use_cases/auth/logout_use_case";
import { useNavigation } from "expo-router";

const SettingsPage = () => {
    const { user } = useContext(UserContext) as UserContextType;
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const _handleLogout = async () => {
        setLoading(true);
        await di.get<LogoutUseCase>(LogoutUseCaseName).call();
        navigation.reset({
            index: 0,
            routes: [{ name: routeList.login.relativePath as never }],
        });
    }


    return <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
            <View style={styles.card}>
                <Image src={user!.imageUrl} style={styles.cardImage} />
                <View>
                    <Text style={styles.cardEmail}>{user!.name}</Text>
                    <Text style={styles.cardId}>ID: {user!.id}</Text>
                </View>
            </View>
            <TouchableOpacity disabled={loading} style={styles.closeSection} onPress={_handleLogout}>
                {loading && <ActivityIndicator style={{marginEnd: 10}} />}
                <Text style={{ color: !loading ? "red" : "gray", fontSize: 16 }}>Close session</Text>
            </TouchableOpacity>
        </View>
        <FooterComponent currentUrl={routeList.settings.relativePath} />
    </View>
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        margin: 10,
        backgroundColor: "#ffffff",
        elevation: 5,
        borderRadius: 10,
    },
    closeSection: {
        padding: 10,
        margin: 10,
        marginTop: 0,
        backgroundColor: "#ffffff",
        elevation: 5,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
    },
    cardImage: { width: 60, height: 60, borderRadius: 50, marginEnd: 10 },
    cardEmail: { fontWeight: "bold", fontSize: 20, marginBottom: 6, },
    cardId: { fontSize: 16 },
});

export default SettingsPage; 