import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';

export const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: #1a1a1a;
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-size: 26px;
  color: #fff;
  font-family: "Inter-700";
`;

export const HeaderButton = styled.TouchableOpacity``;

export const MapContainer = styled.View`
  overflow: hidden;
  border-radius: 10px;
  margin-top : 20px;
`;

export const CaptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const Caption = styled.Text`
  font-size: 16px;
  color: #ababab;
  font-family: "Inter-600";
  margin-right: 5px;
`;

export const CaptionDescription = styled.Text`
  font-size: 16px;
  color: #ababab;
  font-family: "Inter-500";
  margin-left: 10px;
`;

export const InfoTitle = styled.Text`
  font-size: 22px;
  color: #7E46FF;
  font-family: "Inter-600";
`;

export const SectionContainer = styled.View`
  margin-top: 20px;
  padding: 20px;
  background-color: #222;
  border-radius: 10px;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 18px;
  justify-content: space-between;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #fff;
  font-family: "Inter-600";
  margin-right: 10px;
  width: 30%;
`;

export const SectionDescription = styled.Text`
  font-size: 16px;
  color: #ddd;
  font-family: "Inter-500";
  width: 70%;
`;

export const Button = styled.TouchableOpacity`
  background-color: #7E46FF;
  padding: 15px;
  border-radius: 10px;
  margin-vertical: 20px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-family: "Inter-600";
`;
