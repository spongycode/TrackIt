import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {giveTodaysDate, giveValidEntry, toastConfig} from '../utils';
import CustomAppBar from '../components/CustomAppBar';
import DashboardBalanceView from '../components/DashboardBalanceView';
import TransactionListView from '../components/TransactionListView';
import CustomAlternateButton from '../components/CustomAlternateButton';
import TextInputsAndButtons from '../components/TextInputsAndButtons';
import ReadModeViews from '../components/ReadModeViews';
import FAB from '../components/FAB';

const Home = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [id, setId] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [mainBalance, setMainBalance] = useState('');
  const [mainIncome, setMainIncome] = useState('');
  const [mainExpense, setMainExpense] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isIncomeState, setIsIncomeState] = useState(true);
  const [isEditMode, setIsEditMode] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (isModalVisible) {
      setIsEditMode(true);
    }
  };

  const getTransaction = async () => {
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
              isIncomeState: isIncomeState,
            });
          }
          finalTempTransactions.push(item);
        }
      });

      await AsyncStorage.setItem(
        'TRANSACTIONS',
        JSON.stringify(finalTempTransactions),
      );
      setTransactions(finalTempTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const saveTransaction = async () => {
    try {
      let tempTransactions = [];
      let tempJSON = await AsyncStorage.getItem('TRANSACTIONS');
      tempTransactions = tempJSON !== null ? JSON.parse(tempJSON) : [];
      tempTransactions.push({
        id: Date.now(),
        title: title,
        price: giveValidEntry(price),
        date: date,
        isIncomeState: isIncomeState,
      });

      await AsyncStorage.setItem(
        'TRANSACTIONS',
        JSON.stringify(tempTransactions),
      );
      getTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  const editTransaction = async (id: string) => {
    transactions.forEach((item, index) => {
      if (item.id === id) {
        item.price = giveValidEntry(price);
        item.title = title;
        item.date = date;
        item.isIncomeState = isIncomeState;
      }
    });
    await AsyncStorage.setItem('TRANSACTIONS', JSON.stringify(transactions));
    getTransaction();
    updateSummation();
  };

  const deleteTransaction = async (id: string) => {
    let tempTransactions = transactions.filter(item => {
      return item.id !== id;
    });
    await AsyncStorage.setItem(
      'TRANSACTIONS',
      JSON.stringify(tempTransactions),
    );
    getTransaction();
    initState();
  };

  const updateSummation = async () => {
    let income: number = 0.0,
      expense: number = 0.0;
    transactions.map(item => {
      if (item.isIncomeState) {
        income += +item.price;
      } else {
        expense += +item.price;
      }
    });
    setMainIncome(income.toFixed(2).toString());
    setMainExpense(expense.toFixed(2).toString());
    setMainBalance((+income - expense).toFixed(2).toString());
  };

  const initState = () => {
    setId('');
    setPrice('');
    setTitle('');
    setDate(giveTodaysDate);
    setIsIncomeState(true);
  };

  useEffect(() => {
    getTransaction();
  }, []);

  useEffect(() => {
    updateSummation();
  }, [transactions]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomAppBar title="Home" />

      <DashboardBalanceView
        mainBalance={mainBalance}
        mainIncome={mainIncome}
        mainExpense={mainExpense}
      />

      <TransactionListView
        transactions={transactions}
        setPrice={setPrice}
        setTitle={setTitle}
        setDate={setDate}
        setId={setId}
        setIsIncomeState={setIsIncomeState}
        setIsEditMode={setIsEditMode}
        setModalVisible={setModalVisible}
      />

      <FAB initState={initState} setModalVisible={setModalVisible} />

      <Modal
        onBackButtonPress={() => toggleModal()}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={styles.modalContent}>
          <MaterialCommunityIcons
            style={styles.modalClose}
            name="close"
            size={40}
            color="#626058"
            onPress={() => toggleModal()}
          />
          <View style={styles.center}>
            {isEditMode ? (
              title === '' ? (
                <Text style={styles.modalTitle}>Add Income/Expense</Text>
              ) : (
                <Text style={styles.modalTitle}>Edit Income/Expense</Text>
              )
            ) : (
              <Text style={styles.modalTitle}>
                {isIncomeState ? 'Income' : 'Expense'}
              </Text>
            )}
          </View>
          {isEditMode ? (
            <>
              <CustomAlternateButton
                isIncomeState={isIncomeState}
                setIsIncomeState={setIsIncomeState}
              />

              <TextInputsAndButtons
                title={title}
                setTitle={setTitle}
                id={id}
                price={price}
                setPrice={setPrice}
                date={date}
                setDate={setDate}
                saveTransaction={saveTransaction}
                editTransaction={editTransaction}
                toggleModal={toggleModal}
                initState={initState}
              />
            </>
          ) : (
            <>
              <ReadModeViews
                isIncomeState={isIncomeState}
                title={title}
                id={id}
                price={price}
                date={date}
                toggleModal={toggleModal}
                deleteTransaction={deleteTransaction}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                setModalVisible={setModalVisible}
              />
            </>
          )}
        </View>
        <Toast config={toastConfig} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 300,
    paddingBottom: 20,
  },
  center: {
    display: 'flex',
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalClose: {
    position: 'absolute',
    right: 0,
    margin: 15,
  },
  modalTitle: {
    fontSize: 23,
    color: '#626058',
  },
  submitBtn: {
    width: '30%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Home;
