import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { TextGlobal } from "../../components/Global";
import { Modal } from "../../components/Modal";
import { api } from "../../services/api";

import { Container, Input, InputContainer, Message } from "./styles";

export function VerificationCode() {
  const [verificationCode, setVerificationCode] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState("Erro");
  const [errorMessage, setErrorMessage] = useState("");

  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);
  const input_5 = useRef(null);
  const input_6 = useRef(null);

  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");

  function handleInputs(text: string, index: number) {
    setVerificationCode((prev) => prev + text);
    if (text) {
      if (index === 0) {
        input_2.current.focus();
      } else if (index === 1) {
        input_3.current.focus();
      } else if (index === 2) {
        input_4.current.focus();
      } else if (index === 3) {
        input_5.current.focus();
      } else if (index === 4) {
        input_6.current.focus();
      }
    }

    if (!text) {
      if (index === 1) {
        input_1.current.focus();
      } else if (index === 2) {
        input_2.current.focus();
      } else if (index === 3) {
        input_3.current.focus();
      } else if (index === 4) {
        input_4.current.focus();
      } else if (index === 5) {
        input_5.current.focus();
      }
    }
  }

  async function handleVerificationCode() {
    if (!verificationCode || verificationCode.length !== 6) {
      setErrorTitle("Erro");
      setErrorMessage("Preencha todos os campos!");
      setIsErrorModalOpen(true);
      setVerificationCode("");
      return;
    }

    setIsLoading(true);
    setIsButtonDisabled(true);

    try {
      const user = JSON.parse(await AsyncStorage.getItem("@vambora:user"));

      const response = await api.post(
        "/user/verify",
        {
          verificationCode,
        },
        {
          headers: {
            user_id: user.id,
          },
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        setIsButtonDisabled(false);

        navigation.navigate("SignIn");
      }
    } catch (error) {
      setIsLoading(false);
      setIsButtonDisabled(false);
      setErrorTitle("Erro");

      if (error.response.data.message === "User not found") {
        setErrorMessage("Usuário não encontrado!");
      } else if (error.response.data.message === "Code doesn't match") {
        setErrorMessage("Código inválido!");
      }

      setIsErrorModalOpen(true);
    }
  }

  useEffect(() => {
    async function getUserEmail() {
      const user = JSON.parse(await AsyncStorage.getItem("@vambora:user"));
      setEmail(user.email);
    }

    getUserEmail();
  }, []);

  return (
    <Container>
      {isErrorModalOpen && (
        <Modal
          setIsErrorModalOpen={setIsErrorModalOpen}
          title={errorTitle}
          description={errorMessage}
        />
      )}
      <TextGlobal size={32} weight="700">
        Verifique seu Código
      </TextGlobal>
      <Message>Um código foi enviado para {email}</Message>
      <InputContainer>
        {Array(6)
          .fill(0)
          .map((_, index) => {
            return (
              <Input
                key={index}
                ref={
                  index === 0
                    ? input_1
                    : index === 1
                    ? input_2
                    : index === 2
                    ? input_3
                    : index === 3
                    ? input_4
                    : index === 4
                    ? input_5
                    : input_6
                }
                keyboardType="numeric"
                onChangeText={(text) => handleInputs(text, index)}
                onKeyPress={(e) => {
                  if (e.nativeEvent.key === "Backspace") {
                    handleInputs("", index);
                    setVerificationCode((prev) => prev.slice(0, -1));
                  }
                }}
                maxLength={1}
              />
            );
          })}
      </InputContainer>
      <Button onPress={handleVerificationCode}> Validar </Button>
    </Container>
  );
}
