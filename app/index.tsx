import { createNativeStackNavigator } from '@react-navigation/native-stack';
import di from './dependency_injection';
import UserProvider, { UserProviderName } from './domain/state/user/UserProvider';
import routeList from './presentation/routes/route_list';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
    const userProvider = di.get<UserProvider>(UserProviderName);

    return (
        <userProvider.Provider>
            <NavigationContainer>
                <NavigationIndependentTree>
                    <Stack.Navigator initialRouteName={routeList.load.relativePath}>
                        {Object.entries(routeList).filter(([key, value]) => value.auth(userProvider.Actions.user)).map(([key, value]) => (
                            <Stack.Screen key={key} options={{ title: value.title, headerShown: value.title != undefined }} name={value.relativePath} component={value.component} />
                        ))}
                    </Stack.Navigator>
                </NavigationIndependentTree>
            </NavigationContainer>
        </userProvider.Provider>
    );
}

export default App;