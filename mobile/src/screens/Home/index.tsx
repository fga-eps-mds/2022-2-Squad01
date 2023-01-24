/* eslint-disable indent */
import React, { StatusBar, View } from "react-native";
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
  LastMatchsText,
  LastMatchContainer,
  LastMathsContainerText,
  Separator,
  LastRideText,
  RideTypeText,
} from "./styles";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import mapStyle from "../mapStyle.json";
import CarLupa from "../../assets/carLupa";
import Volante from "../../assets/volante";
import ClockIcon from "../../assets/clock";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { api } from "../../services/api";
import MapViewDirections from "react-native-maps-directions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const mapRef = useRef(null);
  const navigation = useNavigation<any>();

  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });

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

    getUserRoute();
  }, []);

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
      <Title>Usuarios do Vambora</Title>
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
          {destination.latitude !== 0 &&
            destination.longitude !== 0 &&
            origin.latitude !== 0 &&
            origin.longitude !== 0 && (
              <MapViewDirections
                origin={{
                  latitude: parseFloat(origin.latitude.toString()),
                  longitude: parseFloat(origin.longitude.toString()),
                }}
                destination={{
                  latitude: parseFloat(destination.latitude.toString()),
                  longitude: parseFloat(destination.longitude.toString()),
                }}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={3}
                strokeColor="#8257E6"
              />
            )}
          <Marker
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
            title="Origem"
            identifier="origin"
          />
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title="Destino"
            identifier="destination"
          />
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

      <View
        style={{
          marginBottom: 40 + getBottomSpace(),
        }}
      >
        <LastMatchsText>Suas ultimas caronas</LastMatchsText>

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
        <Separator />
      </View>
    </Container>
  );
}
