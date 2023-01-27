import React, { useEffect } from "react";

import { Container } from "./styles";

import { Logo } from "../../assets/Logo";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Welcome() {
  const navigation = useNavigation<any>();

  async function handleNavigate() {
    const user = JSON.parse(
      (await AsyncStorage.getItem("@vambora:user")) || "{}"
    );

    if (user.token) {
      navigation.navigate("BottomTabs");
    } else {
      navigation.navigate("SignIn");
    }
  }

  useEffect(() => {
    handleNavigate();
  }, []);

  return (
    <Container>
      <Logo />
    </Container>
  );
}
