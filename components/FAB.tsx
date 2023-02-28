import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FAB = (props: any) => {
  return (
    <TouchableOpacity
      style={styles.fabStyle}
      onPress={() => {
        props.initState();
        props.setModalVisible(true);
      }}>
      <MaterialCommunityIcons name="plus" size={40} color="#fff" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  fabStyle: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#F9C201',
    borderRadius: 20,
  },
});
export default FAB;
