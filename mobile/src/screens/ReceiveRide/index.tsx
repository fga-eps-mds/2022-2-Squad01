/* eslint-disable indent */
import {
  BackIcon,
  Container,
  MapContainer,
  Title,
  TitleText,
  AvailableRideContainer,
  AvailableRideTitle,
  AvailableRideFilterContent,
  AvaibleRideFilterTitle,
  AvaibleRideFilterText,
  Separator,
  SeparatorDivs,
  RadioButtonContainer,
  RadioButton,
  FilterContainer,
  FilterText,
  EmptyRidesContainer,
  EmptyRidesText,
  SliderContainer,
  SliderRangeText,
} from "./styles";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import MapView, { Circle, Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import mapStyle from "../mapStyle.json";
import MapViewDirections from "react-native-maps-directions";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Traject } from "../../components/Traject";
import { ScrollView, View } from "react-native";
import Slider from "@react-native-community/slider";
import { ReceiveRideCard } from "../../components/ReceiveRideCard";

export function ReceiveRide() {
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

  const [route, setRoute] = useState({
    id: "",
    destinationName: "",
    distance: "",
    duration: "",
    originNeighborhood: "",
    originNeighborhoodSlug: "",
  });

  const [mapRadius, setMapRadius] = useState(0);

  const [filters, setFilters] = useState([
    {
      id: 1,
      name: "neighborhood",
      isActive: false,
    },
    {
      id: 2,
      name: "range",
      isActive: false,
    },
  ]);

  const [rides, setRides] = useState([]);

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

      getAllRides(defaultRoute.id);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getAllRides(userRouteId: string) {
    try {
      const response = await api.get("/ride/all");

      setRides(
        response.data.rides.filter((ride: any) => ride.route.id !== userRouteId)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getRidesByNeighborhood(isActive: boolean) {
    if (isActive) {
      getAllRides(route.id);
      return;
    }

    try {
      const response = await api.get(
        `/ride/neighborhood?neighborhood=${route.originNeighborhoodSlug}`
      );

      setRides(response.data.filter((ride: any) => ride.route.id !== route.id));
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getRoutesByRange() {
    try {
      const response = await api.get(
        `/ride/range?lat=${origin.latitude.toFixed(
          6
        )}&lng=${origin.longitude.toFixed(6)}&radius=${(
          mapRadius / 1000
        ).toFixed(0)}}`
      );

      setRides(response.data.filter((ride: any) => ride.route.id !== route.id));
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserRoute();
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

  function handleFilter(id: number) {
    const newFilters = filters.map((filter) => {
      if (filter.id === id) {
        filter.isActive = !filter.isActive;
      } else {
        filter.isActive = false;
      }

      return filter;
    });

    setFilters(newFilters);
  }

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
      >
        <Title>
          <BackIcon onPress={() => navigation.navigate("Home")}>
            <MaterialCommunityIcons
              name="chevron-left"
              color="#fff"
              size={35}
            />
          </BackIcon>
          <TitleText>Receber Carona</TitleText>
        </Title>
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
                  <Circle
                    center={{
                      latitude: origin.latitude,
                      longitude: origin.longitude,
                    }}
                    radius={mapRadius}
                    fillColor="rgba(130, 87, 230, 0.1)"
                    strokeWidth={1}
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
                  width: 10,
                  height: 10,
                  borderRadius: 15,
                  backgroundColor: "#8257E6",
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
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 15,
                  backgroundColor: "#32CD32",
                }}
              />
            </Marker>
            {rides.length > 0 &&
              rides.map((userRide) => (
                <Marker
                  key={userRide.route.id}
                  coordinate={{
                    latitude: userRide.route.origin[0],
                    longitude: userRide.route.origin[1],
                  }}
                  title={userRide.route.originNeighborhood}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 15,
                      backgroundColor: "#fff",
                    }}
                  />
                </Marker>
              ))}
          </MapView>
        </MapContainer>
        <Traject route={route} returnTo="receive" />
        <AvailableRideContainer>
          <AvailableRideTitle>Caronas Disponiveis</AvailableRideTitle>
          <AvailableRideFilterContent>
            <AvaibleRideFilterTitle>
              <FontAwesome5 name="sliders-h" size={24} color="white" />
              <AvaibleRideFilterText>Filtros</AvaibleRideFilterText>
              <Separator />
            </AvaibleRideFilterTitle>
            <FilterContainer
              onPress={() => {
                handleFilter(1);
                getRidesByNeighborhood(!filters[0].isActive);
              }}
            >
              <RadioButtonContainer>
                {filters[0].isActive && <RadioButton />}
              </RadioButtonContainer>
              <FilterText>Apenas caronas saindo do seu bairro</FilterText>
            </FilterContainer>
            <FilterContainer
              onPress={() => {
                handleFilter(2);
                setMapRadius(0);

                if (!filters[1].isActive) {
                  getAllRides(route.id);
                }

                setRides([]);
              }}
            >
              <RadioButtonContainer>
                {filters[1].isActive && <RadioButton />}
              </RadioButtonContainer>
              <FilterText>Pesquisar por raio de distância até você</FilterText>
            </FilterContainer>
            {filters[1].isActive && (
              <SliderContainer>
                <SliderRangeText>
                  {(mapRadius / 1000).toFixed(0)} km
                </SliderRangeText>
                <Slider
                  style={{ width: "100%", height: 20 }}
                  minimumValue={0}
                  maximumValue={10000}
                  minimumTrackTintColor="#8257E6"
                  maximumTrackTintColor="#333333"
                  onValueChange={(value) => {
                    setMapRadius(value);
                  }}
                  onSlidingComplete={(value) => {
                    getRoutesByRange();
                  }}
                  tapToSeek={true}
                />
              </SliderContainer>
            )}
          </AvailableRideFilterContent>
          <SeparatorDivs />
          {rides.length > 0 ? (
            rides.map((ride) => (
              <ReceiveRideCard
                key={ride.route.id}
                ride={ride}
                origin={origin}
              />
            ))
          ) : (
            <EmptyRidesContainer>
              <EmptyRidesText>
                Não encontramos nenhuma carona ativa no momento :(
              </EmptyRidesText>
            </EmptyRidesContainer>
          )}
        </AvailableRideContainer>
      </ScrollView>
    </Container>
  );
}
