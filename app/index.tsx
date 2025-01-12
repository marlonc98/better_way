import { createNativeStackNavigator } from '@react-navigation/native-stack';
import di from './dependency_injection';
import UserProvider, { UserProviderName } from './domain/state/user/UserProvider';
import routeList from './presentation/routes/route_list';
import UserEntity from './domain/entities/user_entity';
import GetCurrentUseCase, { GetCurrentUseCaseName } from './domain/use_cases/auth/get_current_user_use_case';
import { useEffect, useState } from 'react';
import LoadPage from './presentation/ui/pages/load_page';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
    const userProvider = di.get<UserProvider>(UserProviderName);
    const [user, setUser] = useState<UserEntity | null | undefined>(undefined);

    const _load = async () => {
        const response = await di.get<GetCurrentUseCase>(GetCurrentUseCaseName).call();
        setUser(response.data ?? null);
        console.log("loaddded")
    }

    useEffect(() => {
        _load();
    }, []);
    return (
        <userProvider.Provider>
            {user === undefined && <LoadPage />}
            {user !== undefined && <Stack.Navigator initialRouteName={user ? routeList.pokemons.relativePath : routeList.login.relativePath}>
                {Object.entries(routeList).map(([key, value]) => (
                    <Stack.Screen key={key} options={{ headerShown: false }} name={value.relativePath} component={value.component} />
                ))}
            </Stack.Navigator>
            }
        </userProvider.Provider>
    );
}

export default App;