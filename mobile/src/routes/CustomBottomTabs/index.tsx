import React from "react-native";

import { Container, Tabs } from "./styles";
import { TextGlobal } from "../../components/Global";

import Profile from "../../assets/profile";
import Home from "../../assets/home";

interface ITab {
  name: string;
  routeName: string;
  icon: (props) => JSX.Element;
}

export function CustomBottomTabs({ navigation }) {
  const screens: ITab[] = [
    {
      name: "Início",
      routeName: "Home",
      icon: Home,
    },
    {
      name: "Perfil",
      routeName: "Profile",
      icon: Profile,
    },
  ];

  return (
    <Container>
      {screens.map((screen, index) => {
        const Icon = screen.icon;
        return (
          <Tabs
            key={index}
            onPress={() => navigation.navigate(screen.routeName)}
          >
            <Icon />
            <TextGlobal color="#ABABAB" weight="700">
              {screen.name}
            </TextGlobal>
          </Tabs>
        );
      })}
    </Container>
  );
}
