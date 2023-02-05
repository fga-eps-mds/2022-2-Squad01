/* eslint-disable indent */
import {
  AboutCarContainer,
  AboutCarSubTitle,
  AboutCarText,
  AboutCarTitle,
  BackIcon,
  CarInfoInput,
  Container,
  CreateRouteButton,
  ExpandMapButton,
  InfoCarForm,
  MapContainer,
  Title,
  TitleText,
} from "./styles";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import mapStyle from "../mapStyle.json";
import MapViewDirections from "react-native-maps-directions";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { TextGlobal } from "../../components/Global";
import { Traject } from "../../components/Traject";

export function OfferRide() {
  const mapRef = useRef(null);
  const [mapHeight, setMapHeight] = useState(270);

  const navigation = useNavigation<any>();
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    license_plate: "",
  });
  const [availableSpots, setAvailableSpots] = useState("");
  const [route, setRoute] = useState({
    id: "",
    destinationName: "",
    distance: "",
    duration: "",
    originNeighborhood: "",
    originNeighborhoodSlug: "",
  });

  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });
  const isFocused = useIsFocused();

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

        setRoute({
          id: defaultRoute.id,
          destinationName: defaultRoute.destinationName,
          distance: defaultRoute.distance,
          duration: defaultRoute.duration,
          originNeighborhood: defaultRoute.originNeighborhood,
          originNeighborhoodSlug: defaultRoute.originNeighborhoodSlug,
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    async function getUserCar() {
      try {
        const response = await api.get("/car");

        if (response.data) {
          setCar({
            brand: response.data.brand,
            model: response.data.model,
            year: response.data.year.toString(),
            color: response.data.color,
            license_plate: response.data.license_plate,
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getUserRoute();
    getUserCar();
  }, [isFocused]);

  async function handleCreateRide() {
    if (
      !car.brand ||
      !car.model ||
      !car.year ||
      !car.color ||
      !car.license_plate ||
      !availableSpots
    ) {
      alert("Preencha todos os campos!");
    }

    try {
      const createdCar = await api.post("/car", {
        brand: car.brand,
        model: car.model,
        year: parseInt(car.year),
        color: car.color,
        license_plate: car.license_plate,
      });

      await api.post("/ride", {
        carId: createdCar.data.id,
        routeId: route.id,
        available_spots: parseInt(availableSpots),
      });

      navigation.navigate("BottomTabs");
    } catch (error) {
      console.log(JSON.stringify(error.response, null, 2));
    }
  }

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
        <TitleText>Oferecer Carona</TitleText>
      </Title>

      <MapContainer>
        <MapView
          style={{
            height: mapHeight,
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
      <Traject route={route} returnTo="offer" />
      <AboutCarContainer>
        <AboutCarTitle>Informações sobre o carro</AboutCarTitle>
        <AboutCarSubTitle>
          Coletamos essas informações para uma maior segurança tanto do
          motorista quanto dos passageiros. Não se preocupe, a placa do carro
          não poderá ser vista por outros usuários.
        </AboutCarSubTitle>
        <InfoCarForm>
          <AboutCarText>Marca</AboutCarText>
          <CarInfoInput
            value={car.brand}
            onChangeText={(text) =>
              setCar({
                ...car,
                brand: text,
              })
            }
          />
          <AboutCarText>Modelo</AboutCarText>
          <CarInfoInput
            value={car.model}
            onChangeText={(text) =>
              setCar({
                ...car,
                model: text,
              })
            }
          />
          <AboutCarText>Ano</AboutCarText>
          <CarInfoInput
            keyboardType="number-pad"
            value={car.year}
            onChangeText={(text) =>
              setCar({
                ...car,
                year: text,
              })
            }
          />
          <AboutCarText>Cor</AboutCarText>
          <CarInfoInput
            value={car.color}
            onChangeText={(text) =>
              setCar({
                ...car,
                color: text,
              })
            }
          />
          <AboutCarText>Placa</AboutCarText>
          <CarInfoInput
            value={car.license_plate}
            onChangeText={(text) =>
              setCar({
                ...car,
                license_plate: text,
              })
            }
          />
          <AboutCarText>Assentos livres</AboutCarText>
          <CarInfoInput
            keyboardType="number-pad"
            value={availableSpots}
            onChangeText={(text) => setAvailableSpots(text)}
          />
        </InfoCarForm>
      </AboutCarContainer>
      <CreateRouteButton>
        <Button onPress={handleCreateRide}>
          <TextGlobal color="#fff" size={23} weight="700">
            Criar Carona
          </TextGlobal>
        </Button>
      </CreateRouteButton>
    </Container>
  );
}
