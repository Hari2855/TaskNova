import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import BackButton from './BackButton';
import {hp, wp} from '../helpers/common';
import {theme} from '../constants/theme';
import {RootStackParamList} from '../types/navigation';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <View style={styles.backButton}>
        <BackButton navigation={navigation} />
      </View>
      <Text style={styles.hetitle}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    gap: 10,
  },
  hetitle: {
    fontSize: hp(2.7),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textDark,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
});
