/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, Button, Item, Input, Icon } from 'native-base';
import { View, StyleSheet } from 'react-native';

export default function Register() {
  return (
    <View style={styles.padding}>
      <Text style={[styles.center, styles.bold, styles.marginBottom]}>
        Sign Up
      </Text>
      <Text style={[styles.center, styles.fontSize_14, styles.marginBottom]}>
        Create your account to post article on Balbalan.
      </Text>
      <Item style={styles.marginBottom}>
        <Icon type="MaterialIcons" name="person" style={styles.blue} />
        <Input placeholder="Full Name" style={styles.fontSize_14} />
      </Item>
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
      <Button rounded block style={styles.btn}>
        <Text style={styles.white}>{'  Sign Up  '}</Text>
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
});
