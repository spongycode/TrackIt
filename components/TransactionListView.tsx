import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {giveTodaysDate} from '../utils';
import {FlatList} from 'react-native';

const TransactionListView = (props: any) => {
  return (
    <View style={{height: 400, marginTop: 10}}>
      <FlatList
        data={props.transactions}
        renderItem={({item}) => {
          let showDate: boolean = false;

          if (item.price === '') {
            showDate = true;
          }
          return (
            <>
              {showDate ? (
                <Text
                  style={{
                    fontWeight: '500',
                    alignSelf: 'center',
                    marginTop: 20,
                  }}>
                  {giveTodaysDate() === item.date ? 'Today' : item.date}
                </Text>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    props.setPrice(item.price);
                    props.setTitle(item.title);
                    props.setDate(item.date);
                    props.setId(item.id);
                    props.setIsIncomeState(item.isIncomeState);
                    props.setIsEditMode(false);
                    props.setModalVisible(true);
                  }}>
                  <View
                    style={{
                      width: '90%',
                      height: 55,
                      borderWidth: 2,
                      flex: 1,
                      borderRadius: 10,
                      marginTop: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignSelf: 'center',
                      alignItems: 'center',
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderColor: '#E9E9E9',
                      shadowColor: '#000',
                      shadowRadius: 100,
                      backgroundColor: '#fff',
                    }}>
                    <Text style={{color: '#626058', fontWeight: 'bold'}}>
                      {item.title}
                    </Text>
                    {item.isIncomeState ? (
                      <Text style={{color: '#00B152', fontWeight: 'bold'}}>
                        ${item.price}
                      </Text>
                    ) : (
                      <Text style={{color: '#D10000', fontWeight: 'bold'}}>
                        ${item.price}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

export default TransactionListView;
