import styled from "styled-components/native";
import { isIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  background-color: #1A1A1A;
  flex: 1;
  padding: 24px;
  padding-top: ${isIphoneX() ? getStatusBarHeight(true) + 24 : 24}px;
  padding-bottom: 0px;
`;

export const Separator = styled.View`
  height: 2px;
  background-color: #ABABAB;
  opacity: 0.3;
  width: 100%;
`;
export const SeparatorDivs = styled.View`
  height: 1px;
  background-color: #ABABAB;
  opacity: 0.5;
  margin-top : 20px;
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

export const AvailableRideContainer = styled.View`
  flex: 1;
  margin-bottom: 24px;
`;

export const AvailableRideFilterContent = styled.View`
  flex: 1;
  width: 100%;
`;

export const AvaibleRideFilterTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

export const AvaibleRideFilterText = styled.Text`
  color: #ffffff;
  font-family: "Inter-500";
  font-size: 17px;
  margin: 0 10px;
`;

export const AvailableRideTitle = styled.Text`
  color: #ffffff;
  padding-top: 20px;
  font-family: "Inter-700";
  font-size: 24px;
`;

export const AvailableRideFromToContainer = styled.TouchableOpacity`
  background-color: #222222;
  border-radius: 10px;
  padding: 20px 20px 10px 20px;
  margin-top: 30px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const AvailableRideFromToContent = styled.View`
  width: 90%;
`;

export const AvailableRideFromToTitle = styled.Text`
  color: #7E46FF;
  font-family: "Inter-700";
  font-size: 20px;
`;

export const AvailableRideFromToSubTitle = styled.Text`
  color: #EFEFEF;
  font-family: "Inter-600";
  font-size: 16px;
  margin-bottom: 12px;
  margin-top: 5px;
`;

export const VectorIcon = styled.TouchableOpacity`
`;

export const RadioButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #ffffff;
  margin-right: 20px;
`;

export const RadioButton = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #8257e6;
`;

export const FilterContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  padding: 5px
`;

export const FilterText = styled.Text`
  color: #ffffff;
  font-family: "Inter-500";
  font-size: 16px;
  width: 90%;
`;

export const EmptyRidesContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: #222;
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
`;

export const EmptyRidesText = styled.Text`
  color: #ffffff;
  font-family: "Inter-600";
  font-size: 16px;
  text-align: center;
`;

export const SliderContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const SliderRangeText = styled.Text`
  color: #ffffff;
  font-family: "Inter-700";
  font-size: 20px;
  margin-top: 10px;
`;

export const SliderText = styled.Text`
  color: #ffffff;
  font-family: "Inter-500";
  font-size: 16px;
  text-align: center;
`;
