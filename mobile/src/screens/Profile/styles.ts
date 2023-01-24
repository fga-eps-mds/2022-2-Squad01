import styled from "styled-components/native";
import { getStatusBarHeight, isIphoneX } from "react-native-iphone-x-helper";


export const Container = styled.View`
  background-color: #1A1A1A;
  flex: 1;
  padding: 24px 0px 0px 0px;
  padding-top: ${isIphoneX() ? getStatusBarHeight(true) + 24 : 24}px;
  align-items : center;
`;

export const ProfilePicture = styled.View`
  width : 200px;
  height: 200px;
  background-color : #222222;
  margin-top : 50px;
  border : 3px;
  border-color : #8257E6;
  border-radius : 100px;
  align-items: center;
  justify-content: center;
`;

export const ProfileText = styled.Text`
  font-family : "Inter-700";
  color : #ffff;
  font-size : 48px;
`;

export const UserNameText = styled.Text`
  margin-top : 50px;
  font-family : "Inter-700";
  font-size : 24px;
  color : #fff;
`;

export const ContatsUserContainer = styled.View`
  background-color: #7E46FF;
  border-radius: 10px;
  width: 90%;
  padding: 20px;
  margin-top: 40px;
`;

export const ContactTitle = styled.Text`
  color : #fff;
  font-family : "Inter-700";
  font-size : 23px;
`;

export const ContactsUserContent = styled.View`
  flex-direction : row;
  margin-top : 20px;
  align-items : center;
`;

export const ContactUser = styled.Text`
  color : #fff;
  font-family : "Inter-600";
  font-size : 18px;
  margin-left : 20px;
  width: 80%;
`;

export const ContactContainer = styled.View`
  flex : 1;
  flex-direction: row;
  align-items : center;
`;

export const IconCopy = styled.TouchableOpacity``;
