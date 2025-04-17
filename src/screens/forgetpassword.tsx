import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {hp, wp} from '../helpers/common';
import {theme} from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import Icon from '../assets/icons';
import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header';

const ForgotPassword: React.FC = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false); // State to track successful reset

  const handlePasswordReset = async () => {
    if (!email) {
      return Alert.alert('Please enter your email address');
    }

    setLoading(true);

    try {
      await auth().sendPasswordResetEmail(email);
      setResetSuccess(true); // Set the resetSuccess state to true on success
      Alert.alert(
        'Success',
        'Password reset email sent. Please check your inbox.',
      );
    } catch (error) {
      console.error('Error sending password reset email: ', error);
      Alert.alert(
        'Error',
        'Failed to send password reset email. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg="white">
      {/* <Header title="Forgot Password" /> */}
      <View style={styles.container}>
        <Header title="Forgot Password" />
        {!resetSuccess ? (
          <>
            {/* <Text style={styles.title}>Forgot Password?</Text> */}
            <Image
              style={styles.forgotImage}
              resizeMode="contain"
              source={require('../assets/images/forgot.jpg')}
              alt="welcome"
            />

            <Input
              icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />

            <Button
              title={loading ? 'Sending...' : 'Send Password Reset Email'}
              onPress={handlePasswordReset}
            />

            <Text
              style={styles.backToLoginText}
              onPress={() => navigation.navigate('Login')}>
              Back to Login
            </Text>
          </>
        ) : (
          // This section will be shown after successful reset
          <View style={styles.successMessageContainer}>
            <Text style={styles.successMessage}>
              Check your inbox for the password reset link.
            </Text>
            <Text style={styles.punchLine}>
              "A new start is just a click away. Reset and regain control!"
            </Text>
            <Text
              style={styles.backToLoginText}
              onPress={() => navigation.navigate('Login')}>
              Go to Login
            </Text>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  forgotImage: {
    height: hp(40),
    width: wp(100),
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    // justifyContent: 'center',
    backgroundColor: '#fff',
    gap: hp(3),
  },

  backToLoginText: {
    textAlign: 'center',
    color: theme.colors.primaryDark,
    textDecorationLine: 'underline',
    fontWeight: theme.fonts.bold,
  },
  successMessageContainer: {
    alignItems: 'center',
  },
  successMessage: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: hp(1),
  },
  punchLine: {
    textAlign: 'center',
    fontSize: hp(1.8),
    fontStyle: 'italic',
    color: theme.colors.primary,
    marginBottom: hp(2),
  },
});

export default ForgotPassword;
