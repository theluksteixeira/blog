import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Detail from "./pages/Datail";
import Search from "./pages/Search";
import CategoryPosts from "./pages/CategoryPosts";

const Stack = createNativeStackNavigator();

function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Datail" component={Detail}></Stack.Screen>
            <Stack.Screen name="Category" component={CategoryPosts}></Stack.Screen>
            <Stack.Screen name="Search" component={Search}></Stack.Screen>
        </Stack.Navigator>
    );
}

export default Routes;
