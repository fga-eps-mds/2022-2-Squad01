import React from "react";

import {
  TrajectContent,
  TrajectContentTexts,
  TrajectEditText,
  TrajectSubTextTitle,
  TrajectTextTitle,
  UserTrajectContainer,
  UserTrajectEdit,
  UserTrajectText,
  UserTrajectTitle,
} from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function Traject({ route, returnTo }) {
  const navigation = useNavigation<any>();

  return (
    <UserTrajectContainer>
      <UserTrajectTitle>
        <UserTrajectText>Seu Trajeto</UserTrajectText>
        <UserTrajectEdit
          onPress={() => {
            navigation.navigate("CreateRoute", {
              action: "edit",
              returnTo,
            });
          }}
        >
          <TrajectEditText>Editar</TrajectEditText>
          <MaterialCommunityIcons
            name="home-edit"
            color="#FFFFFFBF"
            size={30}
          />
        </UserTrajectEdit>
      </UserTrajectTitle>
      <TrajectContent>
        <MaterialCommunityIcons name="home" color="#fff" size={35} />
        <TrajectContentTexts>
          <TrajectTextTitle>Casa</TrajectTextTitle>
          <TrajectSubTextTitle>{route.originNeighborhood}</TrajectSubTextTitle>
        </TrajectContentTexts>
      </TrajectContent>
      <TrajectContent>
        <MaterialCommunityIcons name="school" color="#fff" size={35} />
        <TrajectContentTexts>
          <TrajectTextTitle>Universidade de Brasilia</TrajectTextTitle>
          <TrajectSubTextTitle>
            Campus {route.destinationName}
          </TrajectSubTextTitle>
        </TrajectContentTexts>
      </TrajectContent>
      <TrajectContent>
        <MaterialCommunityIcons
          name="map-marker-distance"
          color="#fff"
          size={35}
        />
        <TrajectContentTexts>
          <TrajectTextTitle>Distância</TrajectTextTitle>
          <TrajectSubTextTitle>{route.distance} km</TrajectSubTextTitle>
        </TrajectContentTexts>
      </TrajectContent>
      <TrajectContent>
        <MaterialCommunityIcons name="progress-clock" color="#fff" size={35} />
        <TrajectContentTexts>
          <TrajectTextTitle>Duração Média</TrajectTextTitle>
          <TrajectSubTextTitle>{route.duration} min</TrajectSubTextTitle>
        </TrajectContentTexts>
      </TrajectContent>
    </UserTrajectContainer>
  );
}
