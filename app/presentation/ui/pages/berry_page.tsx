import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text } from "react-native"
import routeList from "../../routes/route_list";
const Tab = createBottomTabNavigator();

const BerryPage = () => {
    return <View>
        <Text>Berry</Text>
    </View>

}

export default BerryPage