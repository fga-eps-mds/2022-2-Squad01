import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #222;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 15px 0px 15px 10px;
`;

export const HeaderText = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: 'Inter-600';
`;

export const ReturnButton = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  bottom: 15px;
`;

export const LogoContainer = styled.View`
  flex: 1;
  background-color: #8257e6;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const Content = styled.View`
  margin-bottom: 20px;
`;

export const Body = styled.View`
  flex: 1;
  padding: 20px;
`;


export const ContentTitle = styled.Text`
  color : #fff;
  font-family: "Inter-700";
  font-size: 28px;
  margin-top: 20px;
`;

export const ContentAbout = styled.Text`
  color: #fff;
  font-family: "Inter-500";
  font-size: 18px;
  margin-top: 20px;
`;

export const CreatorsImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;

`;

export const CreatorsContainer = styled.View`
  justify-content: space-between;
`;

export const CreatorsTextAbout = styled.View`
  width: 100%;
`;

export const CreatorAbout = styled.Text`
  color: #fff;
  font-family: "Inter-500";
  font-size: 15px;
  margin: 0 20px;
  width: 65%;
`;

export const CreatorContent = styled.View`
  padding: 12px;
  background-color: #8257e6;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;
