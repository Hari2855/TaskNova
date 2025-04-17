import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import {hp, wp} from '../helpers/common';
import {theme} from '../constants/theme';
import Button from '../components/Button';
import type {RootStackParamList} from '../types/navigation';

// Define the navigation type for this screen
type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

const Welcome: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <ScreenWrapper>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        {/* Welcome image */}
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require('../assets/images/welcome.png')}
        />

        {/* Title and Punchline */}
        <View style={{gap: 20}}>
          <Text style={styles.title}>TaskNova!</Text>
          <Text style={styles.punchline}>
            "Own your productivity with a system that adapts to you. From daily
            tasks to top priorities — manage your time and goals, your way."
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{marginHorizontal: wp(3)}}
            onPress={() => navigation.navigate('Register')}
          />

          <View style={styles.buttonTextContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: wp(4),
  },
  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: 'center',
    fontWeight: theme.fonts.extrabold,
  },
  punchline: {
    textAlign: 'center',
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.primaryDark,
  },
  footer: {
    gap: 30,
    width: '100%',
  },
  buttonTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  loginText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
