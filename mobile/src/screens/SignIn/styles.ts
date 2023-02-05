import styled from "styled-components/native";


export const Container = styled.View`
  flex: 1;
  background : #262626;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin-left: 5px;
  margin-bottom: 10px;
  font-size: 20px;
  color : #fafafa;
  font-family: "Inter-500"
`;

export const Form = styled.View`
  width: 75%;
  margin-top: 110px;
`;

export const InputText = styled.TextInput`
  padding: 10px;
  border-radius: 5px;
  background: #333;
  margin-bottom: 20px;
  color: #fff;
`;

export const NoRegisterText = styled.Text`
  margin-bottom: 100px;
  margin-left: 5px;
  font-size: 16px;
  color : #fafafa;
  font-family: "Inter-600"
`;

export const LinkText = styled.Text`
  color : #8257E5;
  font-weight: 600;
  font-size: 16px
`;

export const AboutButton = styled.TouchableOpacity`
  margin-top: 30px;
  margin-bottom: 20px;
  width: 100%;
  height: 50px;
  border: 1px solid #8257E5;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-horizontal: 20px;
`;

export const AboutButtonText = styled.Text`
  color: #ddd;
  font-size: 16px;
  font-weight: 600;
`;
