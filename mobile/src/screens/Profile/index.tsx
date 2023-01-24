import {
  ContactTitle,
  Container,
  ContactsUserContainer,
  ProfilePicture,
  ProfileText,
  UserNameText,
  ContactsUserContent,
  ContactUser,
  ContactContainer,
  IconCopy,
  LogOutContainer,
  LogOutText,
  UserInfoContainer,
} from "./styles";

import TelePhoneIcon from "../../assets/telephone";
import EmailIcon from "../../assets/email";
import InstagramIcon from "../../assets/Instagram";
import CopyIcon from "../../assets/copy";

import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [instagram, setInstagram] = useState("");

  const navigation = useNavigation<any>();

  useEffect(() => {
    async function getUserInfo() {
      const user = await AsyncStorage.getItem("@vambora:user");

      if (user) {
        const { email, name, enrollment, cellphone, instagram } =
          JSON.parse(user);

        setEmail(email);
        setName(name);
        setEnrollment(enrollment);
        setCellphone(cellphone);
        setInstagram(instagram);
      }
    }

    getUserInfo();
  }, []);

  async function handleLogOut() {
    await AsyncStorage.removeItem("@vambora:user");

    navigation.navigate("SignIn");
  }

  return (
    <Container>
      <UserInfoContainer>
        <ProfilePicture>
          {name.length > 0 && (
            <ProfileText>
              {name.split(" ")[0][0]}
              {name.split(" ")[name.split(" ").length - 1][0]}
            </ProfileText>
          )}
        </ProfilePicture>
        <UserNameText>{name}</UserNameText>
        <ContactsUserContainer>
          <ContactTitle>Contatos</ContactTitle>
          <ContactsUserContent>
            <ContactContainer>
              <TelePhoneIcon />
              <ContactUser>{cellphone}</ContactUser>
            </ContactContainer>
            <IconCopy onPress={() => Clipboard.setStringAsync(cellphone)}>
              <CopyIcon />
            </IconCopy>
          </ContactsUserContent>
          <ContactsUserContent>
            <ContactContainer>
              <EmailIcon />
              <ContactUser>{email}</ContactUser>
            </ContactContainer>
            <IconCopy onPress={() => Clipboard.setStringAsync(email)}>
              <CopyIcon />
            </IconCopy>
          </ContactsUserContent>
          <ContactsUserContent>
            <ContactContainer>
              <InstagramIcon />
              <ContactUser>{instagram}</ContactUser>
            </ContactContainer>
            <IconCopy onPress={() => Clipboard.setStringAsync(instagram)}>
              <CopyIcon />
            </IconCopy>
          </ContactsUserContent>
        </ContactsUserContainer>
      </UserInfoContainer>
      <LogOutContainer onPress={handleLogOut}>
        <LogOutText>Sair</LogOutText>
        <MaterialCommunityIcons name="logout" size={24} color="red" />
      </LogOutContainer>
    </Container>
  );
}
