import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #222;
`;

export const Header = styled.View`
  background-color: #8257e6;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 0px 0px 10px 10px;
`;

export const HeaderText = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: 'Inter-600';
`;

export const ReturnButton = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  bottom: 10px;
`;

export const LogoContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #8257e6;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
