import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextStyle,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {hp, wp} from '../helpers/common';
import {theme} from '../constants/theme';
import Input from '../components/Input';
import Icon from '../assets/icons';
import auth from '@react-native-firebase/auth';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types/navigation';
import Header from '../components/Header';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

const Register: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  // Use useState instead of useRef for input values
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInput = (): boolean => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName) {
      Alert.alert('Validation Error', 'Name is required!');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      Alert.alert('Validation Error', 'Name must contain only alphabets!');
      return false;
    }

    if (!trimmedEmail) {
      Alert.alert('Validation Error', 'Email is required!');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      Alert.alert('Validation Error', 'Enter a valid email address!');
      return false;
    }

    if (!trimmedPassword) {
      Alert.alert('Validation Error', 'Password is required!');
      return false;
    }
    if (trimmedPassword.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long!',
      );
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInput()) return;
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg="#ffffff">
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Header title="Sign Up" />

        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{fontSize: hp(1.8), color: theme.colors.text}}>
            Please fill the details to create an account
          </Text>

          <Input
            icon={<Icon name="user" size={26} strokeWidth={1.6} />}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title={'Sign Up'}
            loading={loading}
            onPress={handleRegister}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.semibold as TextStyle['fontWeight'],
                },
              ]}>
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.8),
  },
});
