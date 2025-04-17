import React, {RefObject} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {theme} from '../constants/theme';
import {hp, wp} from '../helpers/common';

type InputProps = TextInputProps & {
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
  inputRef?: RefObject<TextInput>;
};

const Input: React.FC<InputProps> = ({
  containerStyle,
  icon,
  inputRef,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon && icon}
      <TextInput
        style={{flex: 1, color: theme.colors.text}}
        placeholderTextColor={theme.colors.textLight}
        ref={inputRef}
        {...rest}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(5.8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous' as ViewStyle['borderCurve'],
    paddingHorizontal: 18,
    gap: 12,
  },
});
