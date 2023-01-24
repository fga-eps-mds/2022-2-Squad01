import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";
import Register from "../screens/Register";
import { VerificationCode } from "../screens/VerificationCode";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { FirstRoute } from "../screens/FirstRoute";
import { Home } from "../screens/Home";
import { CustomBottomTabs } from "./CustomBottomTabs";
import { Profile } from "../screens/Profile";
import { OfferRide } from "../screens/OfferRide";
import { ReceiveRide } from "../screens/ReceiveRide";
// import Loading from "../pages/Loading";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
      tabBar={(props: BottomTabBarProps) => {
        return <CustomBottomTabs {...props} />;
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="FirstRoute" component={Home} />
      <Tab.Screen name="Register" component={Home} />
      <Tab.Screen name="VerificationCode" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Início"
    >
      <Stack.Screen name="BottomTabs" component={TabRoutes} />
      <Tab.Screen name="FirstRoute" component={FirstRoute} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Welcome" component={Welcome} />
      {/* <Stack.Screen
        name="Loading"
        component={Loading}
      /> */}
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="OfferRide" component={OfferRide} />
      <Stack.Screen name="ReceiveRide" component={ReceiveRide} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return <StackRoutes />;
}
