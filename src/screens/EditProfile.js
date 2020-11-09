/* eslint-disable prettier/prettier */
import React from 'react';
import { Container, Content, Text, Item, Input, Button, Thumbnail, Icon } from 'native-base';
import { View, StyleSheet } from 'react-native';

// import default avatar
import User from '../assets/img/avatar.png';

export default function EditProfile() {
  return (
    <Container>
      <Content style={styles.padding}>
        <Text style={[styles.bold, styles.header]}>
          Edit your profile
        </Text>
        <View style={styles.avatar}>
          <Thumbnail source={User} />
        </View>
        <Item style={styles.marginBottom}>
          <Icon type="MaterialIcons" name="person" style={styles.blue} />
          <Input value="Muhammad Abdurasyid" style={styles.fontSize_14} />
        </Item>
        <Item style={styles.marginBottom}>
          <Icon type="MaterialIcons" name="email" style={styles.blue} />
          <Input value="tester@mail.com" style={styles.fontSize_14} />
        </Item>
        <Button rounded block style={styles.btn}>
          <Text style={styles.white}>{'  Save  '}</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    marginTop: 16,
  },
  avatar: {
    alignItems: 'center',
    marginBottom: 24,
  },
  marginBottom: {
    marginBottom: 16,
  },
  fontSize_14: {
    fontSize: 14,
  },
  blue: {
    color: '#2395FF',
  },
  white: {
    color: 'white',
  },
  btn: {
    backgroundColor: '#2395FF',
    marginTop: 32,
  },
});
