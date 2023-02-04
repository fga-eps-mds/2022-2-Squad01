import {
  Container,
  ContentContainer,
  Inputs,
  InputText,
  LinkText,
  NoRegisterText,
  RegisterTitle,
  Title,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";
import { ActivityIndicator } from "react-native";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const navigation = useNavigation<any>();

  function handleNavigationToLogin() {
    navigation.navigate("SignIn");
  }

  const [name, setName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [instagram, setInstagram] = useState("@");

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

  function maskCellphone(e: any) {
    let value = e.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");

    setCellphone(value);
  }

  async function handleRegister() {
    if (!name || !enrollment || !email || !password || !cellphone) {
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
        cellphone,
        instagram,
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
      if (error.response === undefined) {
        console.log(error);

        setErrorMessage(
          "Houve um erro no servidor, tente novamente mais tarde."
        );
        setIsErrorModalOpen(true);
      } else {
        if (error.response.data.message === "User already exists!") {
          setErrorMessage("Um usuário já existe com esse e-mail!");
          setIsErrorModalOpen(true);
        } else if (
          error.response.data.message ===
          "Password must contain at least 8 characters, one capital letter and one number"
        ) {
          setErrorMessage(
            "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula e um número!"
          );
          setIsErrorModalOpen(true);
        } else {
          setErrorMessage("Erro ao criar usuário!");
          setIsErrorModalOpen(true);
        }
      }
    }

    setIsLoading(false);
    setIsButtonDisabled(false);
  }

  function handleInstagram(e: any) {
    if (e.length > 0) {
      setInstagram(e);
    } else {
      setInstagram("@");
    }
  }

  return (
    <Container>
      {isErrorModalOpen && (
        <Modal
          setIsErrorModalOpen={setIsErrorModalOpen}
          title={errorTitle}
          description={errorMessage}
        />
      )}
      <SafeAreaView style={{ flex: 1 }} />
      <ContentContainer>
        <RegisterTitle>Registro</RegisterTitle>
        <Inputs>
          <Title>Nome Completo *</Title>
          <InputText
            onChangeText={setName}
            autoComplete="off"
            autoCorrect={false}
          />
          <Title>Matrícula *</Title>
          <InputText
            keyboardType="number-pad"
            onChangeText={(e) => fillEmail(e)}
          />
          <Title>E-mail institucional *</Title>
          <InputText
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            autoCorrect={false}
          />
          <Title>Senha *</Title>
          <InputText onChangeText={setPassword} secureTextEntry={true} />
          <Title>Telefone *</Title>
          <InputText
            onChangeText={maskCellphone}
            value={cellphone}
            autoCorrect={false}
          />
          <Title>Instagram</Title>
          <InputText
            onChangeText={handleInstagram}
            value={instagram}
            autoCorrect={false}
          />
          <NoRegisterText>
            Já Possui Conta?
            <LinkText onPress={handleNavigationToLogin}> Fazer Login</LinkText>
          </NoRegisterText>
        </Inputs>
        <Button disabled={isButtonDisabled} onPress={handleRegister}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </ContentContainer>
    </Container>
  );
}
