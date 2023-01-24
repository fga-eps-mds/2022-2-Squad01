import styled from "styled-components/native";
import { isIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.ScrollView`
  background-color: #1A1A1A;
  flex: 1;
  padding: 24px ;
  padding-top: ${isIphoneX() ? getStatusBarHeight(true) + 24 : 24}px;
`;

export const MapContainer = styled.View`
  overflow: hidden;
  border-radius: 10px;
  margin-top : 20px;
`;

export const Title = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const TitleText = styled.Text`
  color: #fff;
  font-family: "Inter-700";
  font-size: 26px;
`;

export const BackIcon = styled.TouchableOpacity`
`;

export const UserTrajectContainer = styled.View``;
