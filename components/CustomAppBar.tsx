import {AppBar} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/core';

const CustomAppBar = (props: any) => {
  const navigation = useNavigation();
  return (
    <AppBar
      style={styles.appbar}
      title={<Text style={styles.titleText}>{props.title}</Text>}
      centerTitle
      color="#F9C201"
      tintColor="#fff"
      leading={
        props.title !== 'Home' ? (
          <TouchableOpacity>
            <MaterialCommunityIcons
              style={{marginLeft: 10}}
              name="keyboard-backspace"
              size={35}
              color="#fff"
              onPress={() => navigation.navigate('Home')}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
      trailing={
        props.title == 'Home' ? (
          <TouchableOpacity>
            <MaterialCommunityIcons
              style={{marginRight: 10}}
              name="account-circle-outline"
              size={35}
              color="#fff"
              onPress={() => navigation.navigate('Profile')}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  appbar: {
    paddingTop: '8%',
  },
  titleText: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default CustomAppBar;
