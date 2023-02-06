import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  CloseButton,
  CloseButtonTitle,
  Container,
  Description,
  ModalContainer,
  Title,
} from "./styles";
import { Modal as ReactModal } from "react-native";

interface ModalProps {
  title: string;
  description: string;
  setIsErrorModalOpen: (value: boolean) => void;
}

export function Modal({ title, description, setIsErrorModalOpen }: ModalProps) {
  return (
    <ReactModal animationType="slide" transparent={true} visible={true}>
      <Container>
        <ModalContainer>
          <Title> {title} </Title>
          <Description> {description} </Description>
          <CloseButton onPress={() => setIsErrorModalOpen(false)}>
            <CloseButtonTitle>Fechar</CloseButtonTitle>
          </CloseButton>
        </ModalContainer>
      </Container>
    </ReactModal>
  );
}
