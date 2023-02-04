import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import {
  getBottomSpace,
  getStatusBarHeight,
  isIphoneX,
} from "react-native-iphone-x-helper";

interface ButtonProps {
  backgroundColor?: string;
  disabled?: boolean;
}

export const Container = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    alignItems: "center",
  }
})`
  flex: 1;
  background: #262626;
`;

export const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  padding-top: ${isIphoneX() ? 20 + getStatusBarHeight() : 20}px;
  padding-bottom: ${isIphoneX() ? 20 + getBottomSpace() : 20}px;
`;

export const RegisterTitle = styled.Text`
  font-size: 45px;
  color: #8257E5;
  font-family: "Inter-700"
`;

export const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
  },
})`
`;

export const Inputs = styled.View`
  margin: 45px 0;
  width: 80%;
`;

export const Form = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin: 0 0 16px 0;
  color: #fafafa;
  font-family: "Inter-500"
`;

export const InputText = styled.TextInput`
  padding: 10px;
  border-radius: 5px;
  background: #333;
  margin-bottom: 20px;
  color: #fff;
`;

export const NoRegisterText = styled.Text`
  margin-left: 5px;
  font-weight: 500;
  font-size: 16px;
  color : #fafafa;
`;

export const LinkText = styled.Text`
  color : #8257E5;
  font-size: 16px;
  font-family: "Inter-700"
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: absolute;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${(props) => props.backgroundColor || "#8257e5"};
  opacity: ${(props) => props.disabled ? 0.5 : 1};
  border-radius: 8px;
  padding: 12px 24px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
