import React, { useEffect, useRef, useState } from "react";

import {
  Caption,
  CaptionContainer,
  CaptionDescription,
  Container,
  Header,
  HeaderButton,
  HeaderText,
  MapContainer,
  SectionContainer,
  InfoTitle,
  InfoContainer,
  SectionTitle,
  SectionDescription,
  Button,
  ButtonText,
} from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import mapStyle from "../mapStyle.json";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { Linking, View } from "react-native";

export function AcceptRide(navigation) {
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });

  const { ride, origin, distanceFromUser } = navigation.route.params;
  const mapRef = useRef(null);

  useEffect(() => {
    console.log(ride);

    setDestination({
      latitude: ride.route.destination[0],
      longitude: ride.route.destination[1],
    });
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
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Header>
          <HeaderButton
            onPress={() => navigation.navigation.navigate("ReceiveRide")}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              color="#fff"
              size={35}
            />
          </HeaderButton>
          <HeaderText>Sobre a carona</HeaderText>
        </Header>
        <MapContainer>
          <MapView
            style={{
              height: 270,
              borderRadius: 10,
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
                <>
                  <MapViewDirections
                    origin={{
                      latitude: parseFloat(ride.route.origin[0].toString()),
                      longitude: parseFloat(ride.route.origin[1].toString()),
                    }}
                    destination={{
                      latitude: parseFloat(destination.latitude.toString()),
                      longitude: parseFloat(destination.longitude.toString()),
                    }}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor="#32CD32"
                  />
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
                    strokeWidth={2}
                    strokeColor="#8257E6"
                  />
                </>
              )}
            <Marker
              coordinate={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}
              title="Origem"
              identifier="origin"
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 15,
                  backgroundColor: "#8257E6",
                }}
              />
            </Marker>
            <Marker
              coordinate={{
                latitude: ride.route.origin[0],
                longitude: ride.route.origin[1],
              }}
              title="Motorista"
              identifier="driver"
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 15,
                  backgroundColor: "#32CD32",
                }}
              />
            </Marker>
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
        <CaptionContainer>
          <Caption>Legenda:</Caption>
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 15,
              backgroundColor: "#32CD32",
              marginLeft: 10,
            }}
          />
          <CaptionDescription>Motorista</CaptionDescription>
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 15,
              backgroundColor: "#8257e6",
              marginLeft: 10,
            }}
          />
          <CaptionDescription>Você</CaptionDescription>
        </CaptionContainer>
        <SectionContainer>
          <InfoTitle>Motorista</InfoTitle>
          <InfoContainer>
            <SectionTitle>Nome:</SectionTitle>
            <SectionDescription>{ride.driver.name}</SectionDescription>
          </InfoContainer>
          <InfoContainer>
            <SectionTitle>E-mail:</SectionTitle>
            <SectionDescription>{ride.driver.email}</SectionDescription>
          </InfoContainer>
          <InfoContainer>
            <SectionTitle>Telefone:</SectionTitle>
            <SectionDescription>{ride.driver.cellphone}</SectionDescription>
          </InfoContainer>
          <InfoContainer>
            <SectionTitle>Instagram:</SectionTitle>
            <SectionDescription>{ride.driver.instagram}</SectionDescription>
          </InfoContainer>
        </SectionContainer>
        <SectionContainer>
          <InfoTitle>Trajeto</InfoTitle>
          <InfoContainer>
            <SectionTitle>Origem:</SectionTitle>
            <SectionDescription>{ride.route.originName}</SectionDescription>
          </InfoContainer>
          <InfoContainer>
            <SectionTitle>Destino:</SectionTitle>
            <SectionDescription>
              Universidade de Brasília - Campus {ride.route.destinationName}
            </SectionDescription>
          </InfoContainer>
          <InfoContainer>
            <SectionTitle>Distância:</SectionTitle>
            <SectionDescription>{ride.route.distance} km</SectionDescription>
          </InfoContainer>
          <InfoContainer>
            <SectionTitle>Distância da origem até você:</SectionTitle>
            <SectionDescription>
              {distanceFromUser.toFixed(2)} km
            </SectionDescription>
          </InfoContainer>
          <InfoContainer>
            <SectionTitle>Duração:</SectionTitle>
            <SectionDescription>{ride.route.duration} min</SectionDescription>
          </InfoContainer>
        </SectionContainer>
        <SectionContainer>
          <InfoTitle>Carro</InfoTitle>
          <InfoContainer>
            <SectionTitle>Carro:</SectionTitle>
            <SectionDescription>
              {ride.car.brand} {ride.car.model}
            </SectionDescription>
          </InfoContainer>
          <InfoContainer>
            <SectionTitle>Cor:</SectionTitle>
            <SectionDescription>{ride.car.color}</SectionDescription>
          </InfoContainer>
          <InfoContainer>
            <SectionTitle>Ano:</SectionTitle>
            <SectionDescription>{ride.car.year}</SectionDescription>
          </InfoContainer>
          <InfoContainer>
            <SectionTitle>Assentos livres:</SectionTitle>
            <SectionDescription>{ride.available_spots}</SectionDescription>
          </InfoContainer>
        </SectionContainer>
        <Button
          onPress={() => {
            Linking.openURL(`mailto:${ride.driver.email}`);
          }}
        >
          <ButtonText>Entrar em contato</ButtonText>
        </Button>
      </SafeAreaView>
    </Container>
  );
}
