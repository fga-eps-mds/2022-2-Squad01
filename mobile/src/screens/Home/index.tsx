/* eslint-disable indent */
import React, { StatusBar, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  Container,
  TrajectContainer,
  Title,
  TrajectText,
  TrajectSubText,
  LocationTexts,
  Traject,
  MapContainer,
  MyTrajectsContainer,
  MarkerContainer,
  MarkerText,
} from "./styles";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import mapStyle from "../mapStyle.json";
import CarLupa from "../../assets/carLupa";
import Volante from "../../assets/volante";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { api } from "../../services/api";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TextGlobal } from "../../components/Global";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home() {
  const mapRef = useRef(null);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function getUserRoute() {
      try {
        const response = await api.get("/route/user");

        const defaultRoute = response.data.route[0];

        setOrigin({
          latitude: defaultRoute.origin[0],
          longitude: defaultRoute.origin[1],
        });

        setDestination({
          latitude: defaultRoute.destination[0],
          longitude: defaultRoute.destination[1],
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    async function getAllUsers() {
      try {
        const response = await api.get("/route/all");

        const user = await AsyncStorage.getItem("@vambora:user");

        let allUsersRoutes = response.data.routes.map((route) => {
          if (route.createdBy === JSON.parse(user).id) return;

          return {
            origin: {
              latitude: route.origin[0],
              longitude: route.origin[1],
            },
            destination: {
              latitude: route.destination[0],
              longitude: route.destination[1],
            },
          };
        });
        allUsersRoutes = allUsersRoutes.filter((route) => route !== undefined);

        setAllUsers(allUsersRoutes);
      } catch (error) {
        console.log(error.message);
      }
    }

    getUserRoute();
    getAllUsers();
  }, [isFocused]);

  useEffect(() => {
    if (!origin || (destination.latitude === 0 && destination.longitude === 0))
      return;

    mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, [origin, destination]);

  return (
    <Container>
      <StatusBar backgroundColor="#222" barStyle="light-content" />
      <Title>
        Usuários do{" "}
        <TextGlobal size={25} weight="700">
          Vambora
        </TextGlobal>
      </Title>
      <MapContainer>
        <MapView
          style={{
            height: 270,
            borderRadius: 20,
          }}
          ref={mapRef}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
        >
          <Marker
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
            title="Você"
            identifier="origin"
          >
            <MarkerContainer>
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 20,
                  backgroundColor: "#8257e6",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </MarkerContainer>
          </Marker>
          <Marker
            coordinate={{
              latitude: -15.98928,
              longitude: -48.04454,
            }}
            title="UnB - Gama"
            identifier="destination"
          >
            <MarkerContainer>
              <MaterialIcons name="engineering" size={24} color="#d5ef2a" />
              <MarkerText>FGA</MarkerText>
            </MarkerContainer>
          </Marker>
          <Marker
            coordinate={{
              latitude: -15.757995,
              longitude: -47.871353,
            }}
            title="UnB - Darcy Ribeiro"
            identifier="destination"
          >
            <MarkerContainer>
              <Ionicons name="school" size={24} color="#0064fa" />
              <MarkerText>Darcy</MarkerText>
            </MarkerContainer>
          </Marker>
          <Marker
            coordinate={{
              latitude: -15.845021,
              longitude: -48.099459,
            }}
            title="UnB - Ceilândia"
            identifier="destination"
          >
            <MarkerContainer>
              <FontAwesome name="ambulance" size={24} color="#d60000" />
              <MarkerText>FCE</MarkerText>
            </MarkerContainer>
          </Marker>
          <Marker
            coordinate={{
              latitude: -15.600754,
              longitude: -47.65857,
            }}
            title="UnB - Planaltina"
            identifier="destination"
          >
            <MarkerContainer>
              <MaterialCommunityIcons name="tree" size={30} color="#00ab50" />
              <MarkerText>FUP</MarkerText>
            </MarkerContainer>
          </Marker>
          {allUsers.length > 0 &&
            allUsers.map((user, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: user.origin.latitude,
                  longitude: user.origin.longitude,
                }}
                identifier={`user${index + 1}`}
              >
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 20,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Marker>
            ))}
        </MapView>
      </MapContainer>
      <TrajectContainer onPress={() => navigation.navigate("OfferRide")}>
        <Traject>
          <Volante color="#fafafa" />
          <LocationTexts>
            <TrajectText>Oferecer Carona</TrajectText>
            <TrajectSubText>
              Que tal diminuir seus custos enquanto ajuda outras pessoas?
            </TrajectSubText>
          </LocationTexts>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#fafafa"
          />
        </Traject>
      </TrajectContainer>
      <TrajectContainer onPress={() => navigation.navigate("ReceiveRide")}>
        <Traject>
          <CarLupa color="#fafafa" />
          <LocationTexts>
            <TrajectText>Receber Carona</TrajectText>
            <TrajectSubText>
              Procure por pessoas que moram perto de você e vão para o mesmo
              campus.
            </TrajectSubText>
          </LocationTexts>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#fafafa"
          />
        </Traject>
      </TrajectContainer>
      {/* <MyTrajectsContainer onPress={() => navigation.navigate("ReceiveRide")}>
        <Traject>
          <Ionicons name="car" size={44} color="#fafafa" />
          <LocationTexts>
            <TrajectText>Suas Caronas</TrajectText>
            <TrajectSubText>
              Veja o status das suas caronas ativas.
            </TrajectSubText>
          </LocationTexts>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#fafafa"
          />
        </Traject>
      </MyTrajectsContainer> */}
      <View
        style={{
          marginBottom: 60 + getBottomSpace(),
        }}
      />
      {/* <LastMatchsText>Suas ultimas caronas</LastMatchsText>
        <LastMatchContainer>
          <ClockIcon />
          <LastMathsContainerText>
            <LastRideText>Casa {"->"} Campus Gama</LastRideText>
            <RideTypeText>Motorista</RideTypeText>
          </LastMathsContainerText>
        </LastMatchContainer>
        <Separator />
        <LastMatchContainer>
          <ClockIcon />
          <LastMathsContainerText>
            <LastRideText>Casa {"->"} Campus Darcy Ribeiro</LastRideText>
            <RideTypeText>Motorista</RideTypeText>
          </LastMathsContainerText>
        </LastMatchContainer>
        <Separator />
        <LastMatchContainer>
          <ClockIcon />
          <LastMathsContainerText>
            <LastRideText>Casa {"->"} Campus Ceilandia</LastRideText>
            <RideTypeText>Motorista</RideTypeText>
          </LastMathsContainerText>
        </LastMatchContainer>
        <Separator />
        <LastMatchContainer>
          <ClockIcon />
          <LastMathsContainerText>
            <LastRideText>Casa {"->"} Campus Planaltina</LastRideText>
            <RideTypeText>Motorista</RideTypeText>
          </LastMathsContainerText>
        </LastMatchContainer>
        <Separator /> */}
    </Container>
  );
}
