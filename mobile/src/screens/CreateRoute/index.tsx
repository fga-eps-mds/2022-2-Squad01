import React, { useEffect, useRef, useState } from "react";

import {
  Campus,
  CampusContainer,
  CampusRow,
  CampusText,
  Container,
  ContinueButton,
  ContinueButtonText,
  DescriptionContainer,
  DescriptionInput,
  HalfContainer,
  Input,
  Label,
  Observation,
  RoutesContainer,
  Title,
} from "./styles";
import {
  Alert,
  Keyboard,
  LogBox,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
  YellowBox,
} from "react-native";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import { api } from "../../services/api";
import Geocoder from "react-native-geocoding";
import { SafeAreaView } from "react-native-safe-area-context";
import mapStyle from "../mapStyle.json";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { allNeighborhoods } from "../../utils/allNeighborhoods";
import Constants from "expo-constants";

export function CreateRoute({ route }) {
  const GOOGLE_MAPS_API_KEY = Constants.manifest.extra.GOOGLE_MAPS_API_KEY;

  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [description, setDescription] = useState("");
  const [campus, setCampus] = useState("");
  const [hasSelectedRoute, setHasSelectedRoute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [originNeighborhood, setOriginNeighborhood] = useState("");
  const mapRef = useRef(null);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  function hasMatchingSubstring(neighborhood: string) {
    return allNeighborhoods.some((str) => {
      return str.indexOf(neighborhood) > -1;
    });
  }

  function updateLocation(location) {
    setOrigin({
      latitude: location.latitude,
      longitude: location.longitude,
    });
    Geocoder.from(location.latitude, location.longitude).then((info) => {
      let neighborhood = "";

      info.results[0].address_components.forEach((r) => {
        if (hasMatchingSubstring(r.long_name)) {
          neighborhood = r.long_name;
        }
      });

      setOriginNeighborhood(neighborhood);
      setDescription(info.results[0].formatted_address);
    });
  }

  useEffect(() => {
    Geocoder.init(GOOGLE_MAPS_API_KEY);

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

          updateLocation(userPosition.coords);

          Geocoder.from(
            userPosition.coords.latitude,
            userPosition.coords.longitude
          ).then((info) => {
            setOriginNeighborhood(
              info.results[0].address_components[
                info.results[0].address_components.length - 5
              ].long_name
            );

            setDescription(info.results[0].formatted_address);
          });
        }
      }
    }

    getUserLocationPermissions();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, [isFocused]);

  useEffect(() => {
    if (!origin) return;

    if (destination.latitude === 0 && destination.longitude === 0) {
      mapRef.current?.fitToSuppliedMarkers(["origin"], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });

      mapRef.current?.animateCamera({
        center: {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        zoom: 15,
      });

      return;
    }
  }, [origin, destination]);

  function fitMarkers(latitude, longitude) {
    mapRef.current?.fitToCoordinates(
      [
        {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        {
          latitude: latitude,
          longitude: longitude,
        },
      ],
      {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      }
    );
  }

  function handleSelection(campus: string) {
    setCampus(campus);

    if (campus === "Darcy Ribeiro") {
      setDestination({
        latitude: -15.757995,
        longitude: -47.871353,
      });

      fitMarkers(-15.757995, -47.871353);
    } else if (campus === "Gama") {
      setDestination({
        latitude: -15.98928,
        longitude: -48.04454,
      });

      fitMarkers(-15.98928, -48.04454);
    } else if (campus === "Ceilândia") {
      setDestination({
        latitude: -15.845021,
        longitude: -48.099459,
      });

      fitMarkers(-15.845021, -48.099459);
    } else {
      setDestination({
        latitude: -15.600754,
        longitude: -47.65857,
      });

      fitMarkers(-15.600754, -47.65857);
    }
  }

  async function handleContinue() {
    if (!originNeighborhood) {
      alert("Selecione um local válido para continuar!");
    }

    const formattedOrigin = [origin.latitude, origin.longitude];
    const formattedDestination = [destination.latitude, destination.longitude];

    try {
      const userHasRoute = await api.get("/route/user");

      if (userHasRoute.data.route.length > 0) {
        await api.patch(
          "/route",
          {
            originName: description,
            distance: parseInt(distance.toFixed(2)),
            duration: parseInt(duration.toFixed(2)),
            origin: formattedOrigin,
            destination: formattedDestination,
            originNeighborhood,
            originNeighborhoodSlug: originNeighborhood,
            destinationName: campus,
          },
          {
            headers: {
              route_id: userHasRoute.data.route[0].id,
            },
          }
        );
      } else {
        await api.post("/route", {
          originName: description,
          distance: parseInt(distance.toFixed(2)),
          duration: parseInt(duration.toFixed(2)),
          origin: formattedOrigin,
          destination: formattedDestination,
          originNeighborhood,
          originNeighborhoodSlug: originNeighborhood,
          destinationName: campus,
        });
      }

      const returnToRoute =
        route.params?.returnTo === "offer"
          ? "OfferRide"
          : route.params?.returnTo === "receive"
          ? "ReceiveRide"
          : "BottomTabs";

      navigation.navigate(returnToRoute);
    } catch (error) {
      alert("Erro!");
      console.log(JSON.stringify(error.response.data, null, 2));
    }
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
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
                customMapStyle={mapStyle}
                loadingEnabled
                onPress={(event) =>
                  updateLocation(event.nativeEvent.coordinate)
                }
              >
                {destination.latitude !== 0 && destination.longitude !== 0 && (
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

                      setHasSelectedRoute(true);
                      setDuration(result.duration);
                      setDistance(result.distance);
                    }}
                  />
                )}
                <Marker
                  coordinate={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                  }}
                  title="Origem"
                  description="Sua localização atual"
                  identifier="origin"
                />
                <Marker
                  coordinate={{
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                  }}
                  title="Destino"
                  description={campus}
                  identifier="destination"
                />
              </MapView>
            )}
          </HalfContainer>
          <HalfContainer>
            <RoutesContainer
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              <Title>
                Vamos {!route.params ? "editar" : "criar"} a sua rota padrão!
              </Title>
              <Label>De onde você irá sair?</Label>
              <View style={{ marginBottom: 12 }}>
                <GooglePlacesAutocomplete
                  placeholder="Por padrão, já selecionamos sua localização atual"
                  nearbyPlacesAPI="GooglePlacesSearch"
                  debounce={400}
                  styles={{
                    container: {
                      flex: 0,
                    },
                    textInput: {
                      fontSize: 18,
                      backgroundColor: "#333",
                      color: "#fff",
                    },
                    row: {
                      backgroundColor: "#333",
                    },
                  }}
                  textInputProps={{
                    placeholderTextColor: "#666",
                    autoCorrect: false,
                  }}
                  query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: "pt-br",
                    components: {
                      country: "br",
                    },
                  }}
                  enablePoweredByContainer={false}
                  onPress={(data: any, details = null) => {
                    setDescription(data.description);

                    setOrigin({
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                    });
                    const coords = {
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                    };
                    updateLocation(coords);
                  }}
                  fetchDetails={true}
                  GooglePlacesSearchQuery={{
                    rankby: "distance",
                  }}
                  enableHighAccuracyLocation={true}
                  renderRow={(rowProps) => {
                    const title = rowProps.structured_formatting.main_text;
                    const address =
                      rowProps.structured_formatting.secondary_text;

                    return (
                      <View
                        style={{
                          backgroundColor: "transparent",
                          paddingVertical: 0,
                          paddingHorizontal: 0,
                          flex: 1,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          {title}
                        </Text>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            marginTop: 8,
                          }}
                        >
                          {address}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <Label>Detalhes</Label>
              <Observation>
                Você pode editar ou complementar a descrição de onde você está
                saindo
              </Observation>
              <DescriptionContainer>
                <DescriptionInput
                  value={description}
                  onChangeText={setDescription}
                />
              </DescriptionContainer>
              <Label>Para qual campus você vai?</Label>
              <CampusContainer>
                <CampusRow>
                  <Campus
                    isSelected={campus === "Darcy Ribeiro"}
                    onPress={() => handleSelection("Darcy Ribeiro")}
                  >
                    <CampusText isSelected={campus === "Darcy Ribeiro"}>
                      Darcy Ribeiro
                    </CampusText>
                  </Campus>
                  <Campus
                    isSelected={campus === "Gama"}
                    onPress={() => handleSelection("Gama")}
                  >
                    <CampusText isSelected={campus === "Gama"}>Gama</CampusText>
                  </Campus>
                </CampusRow>
                <CampusRow>
                  <Campus
                    isSelected={campus === "Ceilândia"}
                    onPress={() => handleSelection("Ceilândia")}
                  >
                    <CampusText isSelected={campus === "Ceilândia"}>
                      Ceilândia
                    </CampusText>
                  </Campus>
                  <Campus
                    isSelected={campus === "Planaltina"}
                    onPress={() => handleSelection("Planaltina")}
                  >
                    <CampusText isSelected={campus === "Planaltina"}>
                      Planaltina
                    </CampusText>
                  </Campus>
                </CampusRow>
                <ContinueButton
                  disabled={!hasSelectedRoute}
                  onPress={handleContinue}
                >
                  <ContinueButtonText>Continuar</ContinueButtonText>
                </ContinueButton>
              </CampusContainer>
              <SafeAreaView />
            </RoutesContainer>
          </HalfContainer>
        </>
      </TouchableWithoutFeedback>
    </Container>
  );
}
