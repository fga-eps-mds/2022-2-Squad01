import React from "react";
import {
  CloseButton,
  CloseButtonTitle,
  Container,
  Description,
  ModalContainer,
  Title,
} from "./styles";
import { Linking, Modal } from "react-native";
import * as Clipboard from "expo-clipboard";

interface ModalProps {
  setIsAcceptModalOpen: (value: boolean) => void;
  email: string;
  instagram: string;
  cellphone: string;
}

export function AcceptRideModal({
  setIsAcceptModalOpen,
  email,
  instagram,
  cellphone,
}: ModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <Container>
        <ModalContainer>
          <Title> Agora é com você! </Title>
          <Description>
            Certifique-se de que o(a) motorista é de confiança antes de aceitar
            a carona. A partir desse ponto, você deve se comunicar diretamente
            com o(a) motorista, por fora do app.
          </Description>
          <CloseButton onPress={() => Linking.openURL(`mailto:${email}`)}>
            <CloseButtonTitle>Abrir e-mail</CloseButtonTitle>
          </CloseButton>
          {instagram.length > 0 && (
            <CloseButton
              onPress={() =>
                Linking.openURL(`https://instagram.com/${instagram.slice(1)}`)
              }
            >
              <CloseButtonTitle>Abrir Instagram</CloseButtonTitle>
            </CloseButton>
          )}
          <CloseButton onPress={() => Clipboard.setStringAsync(cellphone)}>
            <CloseButtonTitle>Copiar telefone</CloseButtonTitle>
          </CloseButton>
          <CloseButton onPress={() => setIsAcceptModalOpen(false)}>
            <CloseButtonTitle>Fechar</CloseButtonTitle>
          </CloseButton>
        </ModalContainer>
      </Container>
    </Modal>
  );
}
