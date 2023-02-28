import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomAlternateButton = (props: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 30,
        alignSelf: 'center',
      }}>
      <TouchableOpacity
        style={
          props.isIncomeState
            ? {
                backgroundColor: '#F9C201',
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                justifyContent: 'center',
                height: 50,
              }
            : {
                backgroundColor: '#E9E9E9',
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                justifyContent: 'center',
                height: 50,
              }
        }
        onPress={() => props.setIsIncomeState(true)}>
        <Text
          style={
            props.isIncomeState
              ? {
                  color: '#fff',
                  paddingLeft: 15,
                  paddingRight: 10,
                  fontSize: 18,
                }
              : {
                  color: '#626058',
                  paddingRight: 15,
                  paddingLeft: 10,
                  fontSize: 18,
                }
          }>
          Income
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          !props.isIncomeState
            ? {
                backgroundColor: '#F9C201',
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                justifyContent: 'center',
                height: 50,
              }
            : {
                backgroundColor: '#E9E9E9',
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                justifyContent: 'center',
                height: 50,
              }
        }
        onPress={() => props.setIsIncomeState(false)}>
        <Text
          style={
            !props.isIncomeState
              ? {
                  color: '#fff',
                  paddingLeft: 15,
                  paddingRight: 10,
                  fontSize: 18,
                }
              : {
                  color: '#626058',
                  paddingRight: 15,
                  paddingLeft: 10,
                  fontSize: 18,
                }
          }>
          Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomAlternateButton;
