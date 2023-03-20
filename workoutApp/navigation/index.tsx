import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import PlannerScreen from "../screens/PlannerScreen";
import React from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import WorkoutDetailScreen from "../screens/WorkoutDetailScreen";
import { ColorSchemeName } from "react-native";


export type RootStackParamList = {
    Root: undefined;
    WorkoutDetail: { slug: string };
    Home: undefined;
    Planner: undefined;
};


export default function Navigation({colorScheme}: {colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
        theme={colorScheme === "light" ? DefaultTheme : DarkTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}


const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="Root">
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="WorkoutDetail"
                component={WorkoutDetailScreen}
                options={{title:"Workout Info"}}
            />
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootStackParamList>();
function BottomTabNavigator() {
    return (
        <BottomTab.Navigator initialRouteName="Home">
            <BottomTab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({color, size}) => {
                        return <MaterialIcons name="home" color={color} size={size} />;
                    }
                }} />
            <BottomTab.Screen name="Planner" component={PlannerScreen}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({color, size}) => {
                        return <Entypo name="add-to-list" color={color} size={size} />;
                    }
                }} />
        </BottomTab.Navigator>
    );
}