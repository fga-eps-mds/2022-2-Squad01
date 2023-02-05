import React from "react";

import {
  Container,
  Header,
  HeaderText,
  LogoContainer,
  ReturnButton,
} from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Logo } from "../../assets/Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

export function About() {
  const navigation = useNavigation<any>();

  return (
    <Container>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#8257e6",
        }}
      />
      <Header>
        <ReturnButton
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color="#fff" />
        </ReturnButton>
        <HeaderText>Sobre</HeaderText>
      </Header>
    </Container>
  );
}
