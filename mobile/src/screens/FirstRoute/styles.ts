import styled from 'styled-components/native';

interface CampusProps {
  isSelected: boolean
}

interface ButtonProps {
  disabled: boolean
}

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: #262626;
`;

export const HalfContainer = styled.View`
  flex: 1;
`

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #8257E5;
  margin-bottom: 24px;
`;

export const RoutesContainer = styled.ScrollView`
  flex: 1;
  padding: 40px;
`

export const Label = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #fff;
`

export const Input = styled.TextInput`
  padding: 10px;
  border: 1px solid #ABABAB;
  border-radius: 5px;
  background: #eee;
  margin-bottom: 20px;
`

export const CampusContainer = styled.View`
  flex: 1;
  align-items: center;
`

export const CampusRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Campus = styled.TouchableOpacity<CampusProps>`
  border: 1px solid #444;
  padding: 8px;
  width: 125px;
  margin: 10px;
  background-color: ${(props) => props.isSelected ? "#8257E5" : "transparent"};
  border-radius: 5px;
`

export const CampusText = styled.Text<CampusProps>`
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: #fff
`

export const ContinueButton = styled.TouchableOpacity<ButtonProps>`
  background-color: #8257e5;
  opacity: ${(props) => props.disabled ? 0.5 : 1};
  border-radius: 8px;
  padding: 12px 24px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`

export const ContinueButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`

