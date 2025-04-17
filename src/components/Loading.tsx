import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
  ActivityIndicatorProps,
} from 'react-native';
import {theme} from '../constants/theme';

type LoadingProps = {
  size?: ActivityIndicatorProps['size'];
  color?: string;
};

const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  color = theme.colors.primary,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
});
