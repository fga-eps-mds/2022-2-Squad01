import React, { useEffect, useState } from "react";

import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  AvailableRideFromToContainer,
  AvailableRideFromToContent,
  AvailableRideFromToSubTitle,
  AvailableRideFromToTitle,
  VectorIcon,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

interface IUser {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  instagram: string;
}

interface ReceiveRideCardProps {
  ride: {
    id: string;
    route: {
      id: string;
      originName: string;
      destinationName: string;
      origin: number[];
      destination: number[];
      originNeighborhood: string;
      originNeighborhoodSlug: string;
      createdAt: string;
      distance: number;
      duration: number;
    };
    car: {
      id: string;
      brand: string;
      model: string;
      year: number;
      color: string;
      licensePlate: string;
    };
    driver: IUser;
    passengers: IUser[];
    available_spots: number;
    createdAt: string;
  };
  origin: {
    latitude: number;
    longitude: number;
  };
}

export function ReceiveRideCard({ ride, origin }: ReceiveRideCardProps) {
  const [distanceFromUser, setDistanceFromUser] = useState(0);
  const navigation = useNavigation<any>();

  useEffect(() => {
    function haversineDistance(
      coords1: { latitude: number; longitude: number },
      coords2: { latitude: number; longitude: number }
    ) {
      function toRad(x: number) {
        return (x * Math.PI) / 180;
      }

      var lon1 = coords1.longitude;
      var lat1 = coords1.latitude;

      var lon2 = coords2.longitude;
      var lat2 = coords2.latitude;

      var R = 6371; // km

      var x1 = lat2 - lat1;
      var dLat = toRad(x1);
      var x2 = lon2 - lon1;
      var dLon = toRad(x2);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d;
    }

    setDistanceFromUser(
      haversineDistance(origin, {
        latitude: ride.route.origin[0],
        longitude: ride.route.origin[1],
      })
    );
  }, []);

  return (
    <AvailableRideFromToContainer
      key={ride.id}
      onPress={() => {
        navigation.navigate("AcceptRide", { ride, origin, distanceFromUser });
      }}
    >
      <AvailableRideFromToContent>
        <AvailableRideFromToTitle>De:</AvailableRideFromToTitle>
        <AvailableRideFromToSubTitle>
          {ride.route.originName}
        </AvailableRideFromToSubTitle>
        <AvailableRideFromToTitle>Para:</AvailableRideFromToTitle>
        <AvailableRideFromToSubTitle>
          Universidade de Brasília - Campus {ride.route.destinationName}
        </AvailableRideFromToSubTitle>
        <AvailableRideFromToTitle>
          Distância da origem até você:
        </AvailableRideFromToTitle>
        <AvailableRideFromToSubTitle>
          {distanceFromUser.toFixed(2)} km
        </AvailableRideFromToSubTitle>
        {/* <AvailableRideFromToTitle>Vagas disponíveis:</AvailableRideFromToTitle>
        <AvailableRideFromToSubTitle>
          {ride.available_spots}
        </AvailableRideFromToSubTitle> */}
        <AvailableRideFromToTitle>Criado em:</AvailableRideFromToTitle>
        <AvailableRideFromToSubTitle>
          {new Date(ride.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}{" "}
          às{" "}
          {new Date(ride.createdAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </AvailableRideFromToSubTitle>
      </AvailableRideFromToContent>
      <VectorIcon>
        <MaterialCommunityIcons
          name="chevron-right"
          size={28}
          color="#ababab"
        />
      </VectorIcon>
    </AvailableRideFromToContainer>
  );
}
