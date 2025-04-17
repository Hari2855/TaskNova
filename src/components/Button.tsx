import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {theme} from '../constants/theme';
import {hp} from '../helpers/common';
import Loading from './Loading';

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  hasShadow?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const Button: React.FC<ButtonProps> = ({
  title = '',
  onPress = () => {},
  loading = false,
  hasShadow = true,
  buttonStyle,
  textStyle,
}) => {
  const shadowStyle: ViewStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, {backgroundColor: 'white'}]}>
        <Loading />
      </View>
    );
  }

  return (
    <Pressable
      style={[styles.button, buttonStyle, hasShadow && shadowStyle]}
      onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous' as ViewStyle['borderCurve'],
  },
  text: {
    fontSize: hp(2),
    color: 'white',
    fontWeight: theme.fonts.bold,
  },
});
