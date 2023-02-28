import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ReadModeViews = (props: any) => {
  return (
    <View style={{alignItems: 'center'}}>
      {!props.isIncomeState ? (
        <Text
          style={{
            color: '#D10000',
            fontSize: 35,
            fontWeight: 'bold',
            marginTop: 40,
          }}>
          ${props.price}
        </Text>
      ) : (
        <Text
          style={{
            color: '#00B152',
            fontSize: 35,
            fontWeight: 'bold',
            marginTop: 40,
          }}>
          ${props.price}
        </Text>
      )}
      <Text
        style={{
          fontSize: 20,
          color: '#626058',
          fontWeight: '500',
          marginTop: 30,
        }}>
        {props.title}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: '#626058',
          fontWeight: '400',
          marginTop: 10,
        }}>
        {props.date}
      </Text>

      <TouchableOpacity
        onPress={() => {
          props.toggleModal();
          props.setIsEditMode(true);
          props.setModalVisible(true);
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 30,
            color: '#fff',
            backgroundColor: '#F9C201',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 30,
          }}>
          Edit
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.deleteTransaction(props.id);
          props.toggleModal();
        }}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            marginBottom: 40,
            color: '#fff',
            fontWeight: 'bold',
            backgroundColor: '#D10000',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 30,
          }}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReadModeViews;
