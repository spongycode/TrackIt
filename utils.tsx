import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Toast, {ErrorToast} from 'react-native-toast-message';

const giveValidEntry = (num: string) => {
  num = num.replace(/,/g, '');
  const decimalIndex = num.indexOf('.');
  if (decimalIndex !== -1) {
    num =
      num.slice(0, decimalIndex + 1) +
      num.slice(decimalIndex + 1).replace(/\./g, '');
  }
  num = num.replace(/^0+/, '');
  return num;
};

const giveTodaysDate = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return formattedDate;
};

const showToast = () => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: 'All fields should contain valid values.',
  });
};

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        marginTop: 5,
        fontSize: 17,
        color: '#000',
      }}
      text2Style={{
        color: '#000',
        marginHorizontal: 10,
        fontSize: 15,
      }}
    />
  ),
};

const getTransaction = async (props: any) => {
  try {
    let tempTransactions: any[] = [];
    let finalTempTransactions: any[] = [];
    let tempJSON = await AsyncStorage.getItem('TRANSACTIONS');
    tempTransactions = tempJSON !== null ? JSON.parse(tempJSON) : [];

    const tempDates = new Set<string>([]);

    tempTransactions.sort((a: any, b: any) =>
      a.id > b.id ? -1 : a.id < b.id ? 1 : 0,
    );

    tempTransactions.map((item: any) => {
      if (item.price !== '') {
        if (!tempDates.has(item.date)) {
          tempDates.add(item.date);
          finalTempTransactions.push({
            id: +item.id + 1,
            title: '',
            price: '',
            date: item.date,
            isIncomeState: props.isIncomeState,
          });
        }
        finalTempTransactions.push(item);
      }
    });

    await AsyncStorage.setItem(
      'TRANSACTIONS',
      JSON.stringify(finalTempTransactions),
    );
    props.setTransactions(finalTempTransactions);
    console.log(finalTempTransactions);
  } catch (error) {
    console.log(error);
  }
};

export {giveValidEntry, giveTodaysDate, showToast, toastConfig, getTransaction};
