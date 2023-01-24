import React from "react-native";

import { Container, Tabs } from "./styles";
import { TextGlobal } from "../../components/Global";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

interface ITab {
  name: string;
  routeName: string;
  icon: string;
}

export function CustomBottomTabs({ navigation }) {
  const screens: ITab[] = [
    {
      name: "Início",
      routeName: "Home",
      icon: "home",
    },
    {
      name: "Perfil",
      routeName: "Profile",
      icon: "account",
    },
  ];
  const [selectedTab, setSelectedTab] = useState("Home");

  function handleNavigate(routeName: string) {
    navigation.navigate(routeName);
    setSelectedTab(routeName);
  }

  return (
    <Container>
      {screens.map((screen, index) => {
        return (
          <Tabs key={index} onPress={() => handleNavigate(screen.routeName)}>
            <MaterialCommunityIcons
              name={screen.icon as "home" | "account"}
              size={35}
              color={selectedTab === screen.routeName ? "#8257E6" : "#ABABAB"}
            />
            <TextGlobal
              color={selectedTab === screen.routeName ? "#8257E6" : "#ABABAB"}
              weight="700"
            >
              {screen.name}
            </TextGlobal>
          </Tabs>
        );
      })}
    </Container>
  );
}
