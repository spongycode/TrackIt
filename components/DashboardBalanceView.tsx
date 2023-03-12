import { View, Text } from 'react-native';
import React from 'react';

const DashboardBalanceView = (props: any) => {
  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: '#fff',
        borderColor: '#D3D3D3',
        height: 150,
        width: '90%',
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <View style={{ alignItems: 'center', width: '44%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Balance</Text>
        <Text style={{ fontWeight: 'bold', color: '#02BEE8', fontSize: 25 }}>
          ₹{props.mainBalance}
        </Text>
      </View>
      <View style={{ height: '85%', width: 2, backgroundColor: '#D3D3D3' }} />
      <View style={{ alignItems: 'center', width: '44%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Income</Text>
        <Text style={{ fontWeight: 'bold', color: '#00B152', fontSize: 20 }}>
          ₹{props.mainIncome}
        </Text>
        <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 14 }}>
          Expense
        </Text>
        <Text style={{ fontWeight: 'bold', color: '#D10000', fontSize: 20 }}>
          ₹{props.mainExpense}
        </Text>
      </View>
    </View>
  );
};

export default DashboardBalanceView;
