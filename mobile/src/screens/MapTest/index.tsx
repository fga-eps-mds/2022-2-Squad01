import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Platform, SafeAreaView, StatusBar } from "react-native";

import { Container, HalfContainer } from "./styles";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import Constants from "expo-constants";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

interface Coordinate {
  latitude: number;
  longitude: number;
}

export function MapTest() {
  const GOOGLE_MAPS_API_KEY = Constants.expoConfig.extra.GOOGLE_MAPS_API_KEY;
  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [riderOrigin, setRiderOrigin] = useState({
    latitude: -15.93067,
    longitude: -48.11156,
  });

  const [destination, setDestination] = useState({
    latitude: -15.98928,
    longitude: -48.04454,
  });

  const [coordinates, setCoordinates] = useState([]);
  const [riderCoordinates, setRiderCoordinates] = useState([]);

  const mapRef = useRef(null);

  useEffect(() => {
    async function getUserLocationPermissions() {
      if (Platform.OS !== "web") {
        const { status } = await requestForegroundPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Permissões insuficientes",
            "Nós precisamos da sua localização para que você possa usar o app.",
            [{ text: "Okay" }]
          );
          return;
        } else {
          const userPosition = await getCurrentPositionAsync();

          setOrigin({
            latitude: userPosition.coords.latitude,
            longitude: userPosition.coords.longitude,
          });
        }
      }
    }

    getUserLocationPermissions();
  }, []);

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, [origin, destination]);

  function updateLocation(location) {
    setOrigin({
      latitude: location.latitude,
      longitude: location.longitude,
    });
  }

  function filterDriverDirections(cs: Coordinate[]) {
    const directions: Coordinate[] = [];

    cs.forEach((c) => {
      if (directions.length > 0) {
        const distance = Math.sqrt(
          Math.pow(directions[directions.length - 1].latitude - c.latitude, 2) +
            Math.pow(
              directions[directions.length - 1].longitude - c.longitude,
              2
            )
        );

        if (distance > 0.015) {
          directions.push(c);
        }
      } else {
        directions.push(c);
      }
    });

    setCoordinates(directions);
  }

  function filterRiderDirections(cs: Coordinate[]) {
    const directions: Coordinate[] = [];

    cs.forEach((c) => {
      if (directions.length > 0) {
        const distance = Math.sqrt(
          Math.pow(directions[directions.length - 1].latitude - c.latitude, 2) +
            Math.pow(
              directions[directions.length - 1].longitude - c.longitude,
              2
            )
        );

        if (distance > 0.015) {
          directions.push(c);
        }
      } else {
        directions.push(c);
      }
    });

    setRiderCoordinates(directions);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar backgroundColor="#000000" barStyle="dark-content" />
      <Container>
        <HalfContainer>
          {origin.latitude !== 0 && origin.longitude !== 0 && (
            <MapView
              style={{
                flex: 1,
              }}
              ref={mapRef}
              initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              provider={PROVIDER_GOOGLE}
              onPress={(event) => updateLocation(event.nativeEvent.coordinate)}
            >
              <MapViewDirections
                origin={{
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                }}
                destination={{
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                }}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={3}
                strokeColor="#8257E5"
                onStart={(params) => {
                  console.log(
                    `Started routing for driver between "${params.origin}" and "${params.destination}"`
                  );
                }}
                onReady={(result) => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);

                  filterDriverDirections(result.coordinates);
                }}
              />
              <Marker
                coordinate={{
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                }}
                title="Origem"
                description="Sua localização atual"
                identifier="origin"
              />
              <MapViewDirections
                origin={{
                  latitude: riderOrigin.latitude,
                  longitude: riderOrigin.longitude,
                }}
                destination={{
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                }}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={3}
                strokeColor="#8257E5"
                onStart={(params) => {
                  console.log(
                    `Started routing for rider between "${params.origin}" and "${params.destination}"`
                  );
                }}
                onReady={(result) => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);

                  filterRiderDirections(result.coordinates);
                }}
              />
              <Marker
                coordinate={{
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                }}
                title="UnB Campus Gama"
                identifier="destination"
              />
              {coordinates.map((coordinate, index) => (
                <Marker key={`coordinate_${index}`} coordinate={coordinate} />
              ))}
              {riderCoordinates.map((coordinate, index) => (
                <Marker key={`coordinate_${index}`} coordinate={coordinate} />
              ))}
            </MapView>
          )}
        </HalfContainer>
        <HalfContainer>
          <GooglePlacesAutocomplete
            placeholder="De onde você quer sair?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "pt-br",
              components: {
                country: "br",
              },
            }}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              setOrigin({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }}
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            enableHighAccuracyLocation={true}
          />
        </HalfContainer>
      </Container>
    </SafeAreaView>
  );
}
