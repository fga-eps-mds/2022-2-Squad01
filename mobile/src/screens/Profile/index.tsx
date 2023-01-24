import {
  ContactTitle,
  Container,
  ContatsUserContainer,
  ProfilePicture,
  ProfileText,
  UserNameText,
  ContactsUserContent,
  ContactUser,
  ContactContainer,
  IconCopy,
} from "./styles";

import TelePhoneIcon from "../../assets/telephone";
import EmailIcon from "../../assets/email";
import InstagramIcon from "../../assets/Instagram";
import CopyIcon from "../../assets/copy";

import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [instagram, setInstagram] = useState("");

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
  return (
    <Container>
      <ProfilePicture>
        {name.length > 0 && (
          <ProfileText>
            {name.split(" ")[0][0]}
            {name.split(" ")[name.split(" ").length - 1][0]}
          </ProfileText>
        )}
      </ProfilePicture>
      <UserNameText>{name}</UserNameText>
      <ContatsUserContainer>
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
      </ContatsUserContainer>
    </Container>
  );
}
