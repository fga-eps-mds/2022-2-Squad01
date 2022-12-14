import { Button } from "../../components/Button";
import { TextGlobal } from "../../components/Global";
import {
  Container,
  Form,
  Title,
  InputText,
  NoRegisterText,
  LinkText,
  ScrollContainer,
  Inputs,
  LoadingContainer,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, Platform, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";
import { Modal } from "../../components/Modal";

export default function Register() {
  const navigation = useNavigation<any>();

  function handleNavigationToLogin() {
    navigation.navigate("SignIn");
  }

  const [name, setName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState("Erro");
  const [errorMessage, setErrorMessage] = useState("");

  function fillEmail(e: any) {
    setEnrollment(e);
    setEmail(e);

    if (e.length >= 9) {
      setEmail(e + "@aluno.unb.br");
    }
  }

  async function handleRegister() {
    if (!name || !enrollment || !email || !password) {
      setErrorMessage("Preencha todos os campos!");
      setIsErrorModalOpen(true);
      return;
    }

    const domain = email.split("@")[1];

    if (domain !== "aluno.unb.br" && domain !== "unb.br") {
      setErrorMessage("E-mail inválido!");
      setIsErrorModalOpen(true);
      return;
    }

    setIsLoading(true);
    setIsButtonDisabled(true);

    try {
      const response = await api.post("/user", {
        email,
        name,
        enrollment,
        password,
      });

      if (response.status === 201) {
        const user = {
          id: response.data.id,
          email,
        };

        await AsyncStorage.setItem("@vambora:user", JSON.stringify(user));

        navigation.navigate("VerificationCode");
      }
    } catch (error) {
      if (error.response.data.message === "User already exists!") {
        setErrorMessage("Um usuário já existe com esse e-mail!");
        setIsErrorModalOpen(true);
      } else {
        setErrorMessage("Erro ao criar usuário!");
        setIsErrorModalOpen(true);
      }
    }

    setIsLoading(false);
    setIsButtonDisabled(false);
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {isErrorModalOpen && (
        <Modal
          setIsErrorModalOpen={setIsErrorModalOpen}
          title={errorTitle}
          description={errorMessage}
        />
      )}
      <SafeAreaView>
        <ScrollContainer>
          <Form>
            <TextGlobal weight="700" size={44}>
              Registrar-se
            </TextGlobal>
            <Inputs>
              <Title>Nome Completo</Title>
              <InputText
                onChangeText={setName}
                autoComplete="off"
                autoCorrect={false}
              />
              <Title>Matrícula</Title>
              <InputText
                keyboardType="number-pad"
                onChangeText={(e) => fillEmail(e)}
              />
              <Title>E-mail institucional</Title>
              <InputText
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
                autoCorrect={false}
              />
              <Title>Senha</Title>
              <InputText onChangeText={setPassword} secureTextEntry={true} />
              <NoRegisterText>
                Já Possui Conta?
                <LinkText onPress={handleNavigationToLogin}>
                  {" "}
                  Fazer Login
                </LinkText>
              </NoRegisterText>
            </Inputs>
            <Button disabled={isButtonDisabled} onPress={handleRegister}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "Cadastrar"
              )}
            </Button>
          </Form>
        </ScrollContainer>
      </SafeAreaView>
    </Container>
  );
}
