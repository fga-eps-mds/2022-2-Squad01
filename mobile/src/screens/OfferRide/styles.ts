import styled from "styled-components/native";
import { isIphoneX, getStatusBarHeight, getBottomSpace } from "react-native-iphone-x-helper";

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
  margin-top: 30px;
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

export const TrajectContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
`;

export const TrajectContentTexts = styled.View`
  margin-left: 14px;
`;

export const TrajectTextTitle = styled.Text`
  color: #fff;
  font-family: "Inter-600";
  font-size: 18px;
`;

export const TrajectSubTextTitle = styled.Text`
  color: #DBDBDB;
  font-size:15px;
`;


export const AboutCarContainer = styled.View`
  background-color: #222222;
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;
`;

export const AboutCarTitle = styled.Text`
  font-family: "Inter-700";
  color: #FFF;
  font-size: 20px;
`;

export const AboutCarSubTitle = styled.Text`
  color: #EFEFEF80;
  font-family: "Inter-500";
  margin-top: 10px;
`;

export const InfoCarForm = styled.View`
  margin-top: 20px;
`;

export const AboutCarText = styled.Text`
  color: #fff;
  font-family: "Inter-600";
  font-size: 18px;
  margin-top: 10px;
`;

export const CarInfo = styled.Text``;

export const CarInfoInput = styled.TextInput`
  color: #fff;
  font-family: "Inter-500";
  font-size: 15px;
  border-bottom-width: 2px;
  border-color: #ABABAB80;
  padding: 3px 0;
`;

export const CreateRouteButton = styled.View`
  margin-top: 30px;
  padding-bottom: ${isIphoneX() ? getBottomSpace() + 70 : 40}px;
`;

export const Overlay = styled.KeyboardAvoidingView`
  flex: 1;
`;
