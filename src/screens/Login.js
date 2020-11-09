/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, Button, Item, Input, Icon } from 'native-base';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default function Login() {
  return (
    <View style={styles.padding}>
      <Text style={[styles.center, styles.bold, styles.marginBottom]}>
        Login
      </Text>
      <Text style={[styles.center, styles.fontSize_14, styles.marginBottom]}>
        Login to your existing account to access all the features in Balbalan.
      </Text>
      <Item style={styles.marginBottom}>
        <Icon type="MaterialIcons" name="email" style={styles.blue} />
        <Input placeholder="Email" style={styles.fontSize_14} />
      </Item>
      <Item style={styles.marginBottom}>
        <Icon type="MaterialIcons" name="lock" style={styles.blue} />
        <Input
          placeholder="Password"
          secureTextEntry
          style={styles.fontSize_14}
        />
      </Item>
      <TouchableOpacity style={styles.marginBottom}>
        <Text style={[styles.fontSize_14, styles.textRight]}>Forgot password?</Text>
      </TouchableOpacity>
      <Button rounded block style={styles.btn}>
        <Text style={styles.white}>{'  Login  '}</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  fontSize_14: {
    fontSize: 14,
  },
  white: {
    color: 'white',
  },
  btn: {
    backgroundColor: '#2395FF',
    marginTop: 32,
  },
  marginBottom: {
    marginBottom: 16,
  },
  blue: {
    color: '#2395FF',
  },
  center: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  textRight: {
    textAlign: 'right',
  },
});
