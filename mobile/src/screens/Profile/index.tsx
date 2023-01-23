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

export function Profile() {
  return (
    <Container>
      <ProfilePicture>
        <ProfileText>BM</ProfileText>
      </ProfilePicture>
      <UserNameText>Bruno Medeiros de Oliveira</UserNameText>
      <ContatsUserContainer>
        <ContactTitle>Contatos</ContactTitle>
        <ContactsUserContent>
          <ContactContainer>
            <TelePhoneIcon />
            <ContactUser>(61)9 9109-2610</ContactUser>
          </ContactContainer>
          <IconCopy onPress={() => Clipboard.setString("(61)9 9109-2610")}>
            <CopyIcon />
          </IconCopy>
        </ContactsUserContent>
        <ContactsUserContent>
          <ContactContainer>
            <EmailIcon />
            <ContactUser>brunomedo4@aluno.unb.br</ContactUser>
          </ContactContainer>
          <IconCopy
            onPress={() => Clipboard.setString("brunomedo4@aluno.unb.br")}
          >
            <CopyIcon />
          </IconCopy>
        </ContactsUserContent>
        <ContactsUserContent>
          <ContactContainer>
            <InstagramIcon />
            <ContactUser>@brunomed</ContactUser>
          </ContactContainer>
          <IconCopy onPress={() => Clipboard.setString("@brunomed")}>
            <CopyIcon />
          </IconCopy>
        </ContactsUserContent>
      </ContatsUserContainer>
    </Container>
  );
}
