/* eslint-disable indent */
import {
  BackIcon,
  Container,
  MapContainer,
  Title,
  TitleText,
  UserTrajectContainer,
} from "./styles";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import mapStyle from "../mapStyle.json";
import MapViewDirections from "react-native-maps-directions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function ReceiveRide() {
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
      <Title>
        <BackIcon onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons name="chevron-left" color="#fff" size={35} />
        </BackIcon>
        <TitleText>Receber Carona</TitleText>
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

      <UserTrajectContainer></UserTrajectContainer>
    </Container>
  );
}
