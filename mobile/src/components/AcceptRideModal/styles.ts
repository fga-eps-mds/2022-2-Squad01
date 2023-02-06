import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  position: absolute;
  flex: 1;
  z-index: 999;
  width: 100%;
  height: 100%;
`;

export const ModalContainer = styled.View`
  background-color: #8257E5;
  opacity: 1;
  padding: 24px;
  border-radius: 8px;
  width: 75%;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #fff;
  font-weight: bold;
`;

export const Description = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-top: 30px;
  text-align: center;
`;

export const CloseButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  background-color: #fff;
  padding: 10px 50px;
  border-radius: 8px;
  margin-bottom: 8px;
  width: 100%;
`;

export const CloseButtonTitle = styled.Text`
  font-size: 20px;
  color: #8257E5;
  font-weight: bold;
  text-align: center;
`;
