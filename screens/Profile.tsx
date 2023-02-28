import {Text, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {createAvatar} from '@dicebear/core';
import {openPeeps} from '@dicebear/collection';
import {SvgXml} from 'react-native-svg';
import CustomAppBar from '../components/CustomAppBar';

const Profile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setaddress] = useState('');

  const avatar = createAvatar(openPeeps, {
    seed: name,
    radius: 100,
  }).toString();

  const fetchProfile = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response: any) => {
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.length);
        const user = data[randomIndex];
        setName(user.name);
        setEmail(user.email);
        setaddress(
          user.address.street +
            ', ' +
            user.address.suite +
            ', ' +
            user.address.city,
        );
      })
      .catch((error: string) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <SafeAreaView>
      <CustomAppBar title="Profile" />

      <View
        style={{
          height: 120,
          width: 120,
          alignSelf: 'center',
          marginTop: 50,
          backgroundColor: '#DEB240',
          borderRadius: 100,
        }}>
        <SvgXml xml={avatar} />
      </View>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.emailText}>{email}</Text>
      <Text style={styles.addressText}>{address}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nameText: {
    marginTop: 20,
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  emailText: {
    marginTop: 5,
    color: '#818081',
    fontSize: 18,
    alignSelf: 'center',
  },
  addressText: {
    marginTop: 5,
    color: '#818081',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default Profile;
