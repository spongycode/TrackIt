import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {giveValidEntry, showToast} from '../utils';

const TextInputsAndButtons = (props: any) => {
  return (
    <View style={{alignItems: 'center'}}>
      <TextInput
        style={styles.input}
        onChangeText={props.setPrice}
        value={props.price}
        placeholder="Amount"
        keyboardType="number-pad"
        maxLength={8}
      />
      <TextInput
        style={styles.input}
        onChangeText={props.setTitle}
        value={props.title}
        placeholder="Description"
      />
      <TextInput
        style={[styles.input, {color: '#626058', backgroundColor: '#EBEBE4'}]}
        onChangeText={props.setDate}
        value={props.date}
        // editable={false}
        placeholder="Date"
      />

      {props.id === '' ? (
        <TouchableOpacity
          onPress={() => {
            if (giveValidEntry(props.price) !== '' && props.title !== '') {
              props.saveTransaction();
              props.initState();
              props.toggleModal();
            } else {
              showToast();
            }
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 30,
              color: '#F9C201',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            if (giveValidEntry(props.price) !== '' && props.title !== '') {
              props.editTransaction(props.id);
              props.initState();
              props.toggleModal();
            } else {
              showToast();
            }
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 30,
              color: '#F9C201',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#D3D3D3',
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default TextInputsAndButtons;
