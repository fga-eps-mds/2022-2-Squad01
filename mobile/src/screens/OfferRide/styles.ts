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

export const UserTrajectContainer = styled.View`
  background-color: #7E46FF;
  border-radius: 10px;
  padding: 20px;
  margin-top: 40px;
`;

export const UserTrajectTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserTrajectEdit = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center
`;

export const TrajectEditText = styled.Text`
  color: #FFFFFFBF;
  font-family: "Inter-600";
  font-size: 15px;
  margin-right: 8px;

`;

export const UserTrajectText = styled.Text`
  color: #fff;
  font-size: 22px;
  font-family: "Inter-600"
`;
