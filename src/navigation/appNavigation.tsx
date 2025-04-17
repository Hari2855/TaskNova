import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/register';
import Login from '../screens/login';
import Home from '../screens/home';
import ForgetPassword from '../screens/forgetpassword';
import {useAuth} from '../context/AuthProvider';
import Welcome from '../screens/welcome';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          // Logged in user sees Home
          <Stack.Screen name="Home" component={Home} />
        ) : (
          // Not logged in, show auth screens
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="forgetpassword" component={ForgetPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
