import React, { useEffect } from "react";

import { Container } from "./styles";

import { Logo } from "../../assets/Logo";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";

export default function Welcome() {
  const navigation = useNavigation<any>();

  async function handleNavigate() {
    const user = JSON.parse(
      (await AsyncStorage.getItem("@vambora:user")) || "{}"
    );

    if (user.token) {
      try {
        const response = await api.get("/route/user");

        if (response.data === undefined) {
          navigation.navigate("SignIn");
        } else if (response.data.route.length === 0) {
          navigation.navigate("CreateRoute");
        } else {
          navigation.navigate("BottomTabs");
        }
      } catch (error) {
        console.log(error.response);
        navigation.navigate("SignIn");
      }
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
