import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined,
  Login: undefined;
  Register: undefined;
  Home: undefined;
  forgetpassword: undefined; 
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
