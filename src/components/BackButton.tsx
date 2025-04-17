import React from 'react';
import {View, Pressable, StyleSheet, GestureResponderEvent} from 'react-native';
import Icon from '../assets/icons';
import {theme} from '../constants/theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type BackButtonProps = {
  size?: number;
  navigation: {
    goBack: () => void;
  };
};

const BackButton: React.FC<BackButtonProps> = ({size = 26, navigation}) => {
  return (
    <Pressable style={styles.button} onPress={() => navigation.goBack()}>
      <Icon
        name="arrowLeft"
        strokeWidth={2.5}
        size={size}
        color={theme.colors.text}
      />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.07)',
  },
});
