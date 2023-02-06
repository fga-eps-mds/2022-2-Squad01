import React from "react";

import {
  Body,
  Container,
  Content,
  ContentAbout,
  ContentTitle,
  CreatorAbout,
  CreatorContent,
  CreatorsContainer,
  CreatorsImage,
  CreatorsTextAbout,
  Header,
  HeaderText,
  ReturnButton,
} from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Samuel from "../../assets/samuel.jpeg";
import Ana from "../../assets/anarocha.jpg";
import Bruno from "../../assets/bruno.jpeg";
import Leo from "../../assets/leo.jpeg";
import Guga from "../../assets/guga.jpeg";
import Kenzo from "../../assets/kenzo.jpeg";

export function About() {
  const navigation = useNavigation<any>();

  return (
    <Container>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#222",
        }}
      />
      <Header>
        <ReturnButton
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color="#fff" />
        </ReturnButton>
        <HeaderText>Sobre</HeaderText>
      </Header>

      <Body>
        <Content>
          <ContentTitle>Vambora</ContentTitle>
          <ContentAbout>
            O Vambora é um aplicativo que visa facilitar a vida dos
            universitarios que estão em busca de uma carona, feito para alunos
            da UnB, o Vambora é uma forma de ajudar a comunidade, construido por
            alunos para alunos.
          </ContentAbout>
        </Content>
        <CreatorsContainer>
          <ContentTitle>Criadores</ContentTitle>
          <CreatorContent>
            <CreatorsImage source={Ana} />
            <CreatorsTextAbout>
              <CreatorAbout style={{ fontFamily: "Inter-700" }}>
                Ana Rocha
              </CreatorAbout>
              <CreatorAbout style={{ marginTop: 10 }}>
                Fã de um nargzin, pavio curto, prefere Netflix e pipoca a festa,
                mãe de pet.
              </CreatorAbout>
            </CreatorsTextAbout>
          </CreatorContent>
          <CreatorContent>
            <CreatorsImage source={Bruno} />
            <CreatorsTextAbout>
              <CreatorAbout style={{ fontFamily: "Inter-700" }}>
                Bruno Medeiros
              </CreatorAbout>
              <CreatorAbout style={{ marginTop: 10 }}>
                Top 15 melhores nadadores do Brasil, sou lindo, so não posso
                abrir a boca.
              </CreatorAbout>
            </CreatorsTextAbout>
          </CreatorContent>
          <CreatorContent>
            <CreatorsImage source={Guga} />
            <CreatorsTextAbout>
              <CreatorAbout style={{ fontFamily: "Inter-700" }}>
                Gustavo Henrique
              </CreatorAbout>
              <CreatorAbout style={{ marginTop: 10 }}>
                Sou muito ruim no vôlei, meu óculos so tem uma perna e não sei
                beber.
              </CreatorAbout>
            </CreatorsTextAbout>
          </CreatorContent>
          <CreatorContent>
            <CreatorsImage source={Kenzo} />
            <CreatorsTextAbout>
              <CreatorAbout style={{ fontFamily: "Inter-700" }}>
                Gustavo Kenzo
              </CreatorAbout>
              <CreatorAbout style={{ marginTop: 10 }}>
                Sei montar o cubo mágico vendado, sou japonês mas não sei
                segurar hashi.
              </CreatorAbout>
            </CreatorsTextAbout>
          </CreatorContent>
          <CreatorContent>
            <CreatorsImage
              source={{ uri: "https://github.com/typejulio.png" }}
            />
            <CreatorsTextAbout>
              <CreatorAbout style={{ fontFamily: "Inter-700" }}>
                Julio Cesar
              </CreatorAbout>
              <CreatorAbout style={{ marginTop: 10 }}>
                ScrumMaster nas horas vagas.
              </CreatorAbout>
            </CreatorsTextAbout>
          </CreatorContent>
          <CreatorContent>
            <CreatorsImage source={Leo} />
            <CreatorsTextAbout>
              <CreatorAbout style={{ fontFamily: "Inter-700" }}>
                Leonardo Lago Moreno
              </CreatorAbout>
              <CreatorAbout style={{ marginTop: 10 }}>
                Eu gosto de jogar, não me pergunte se 5 é maior que 3, não
                consigo responder
              </CreatorAbout>
            </CreatorsTextAbout>
          </CreatorContent>
          <CreatorContent>
            <CreatorsImage source={Samuel} />
            <CreatorsTextAbout>
              <CreatorAbout style={{ fontFamily: "Inter-700" }}>
                Samuel Ricardo
              </CreatorAbout>
              <CreatorAbout style={{ marginTop: 10 }}>
                Eu gosto da minha ex e eu já tomei 3 multas no mesmo lugar e no
                msm dia.
              </CreatorAbout>
            </CreatorsTextAbout>
          </CreatorContent>
        </CreatorsContainer>
      </Body>
    </Container>
  );
}
