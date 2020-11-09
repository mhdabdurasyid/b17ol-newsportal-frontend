/* eslint-disable prettier/prettier */
import React from 'react';
import {Container, Content, Text, Item, Input, Button} from 'native-base';
import {StyleSheet} from 'react-native';

export default function PostArticle() {
  return (
    <Container>
      <Content style={styles.padding}>
        <Text style={[styles.bold, styles.header]}>
          Write your article here.
        </Text>
        <Text style={[styles.bold, styles.fontSize_14, styles.marginBottom]}>
          Title
        </Text>
        <Item regular style={styles.marginBottom}>
          <Input
            multiline={true}
            numberOfLines={3}
            style={styles.fontSize_14}
          />
        </Item>
        <Text style={[styles.bold, styles.fontSize_14, styles.marginBottom]}>
          Content/Description
        </Text>
        <Item regular style={styles.marginBottom}>
          <Input
            multiline={true}
            numberOfLines={9}
            style={styles.fontSize_14}
          />
        </Item>
        <Button rounded block style={styles.btn}>
          <Text style={styles.white}>Post Article</Text>
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
  fontSize_14: {
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#2395FF',
    marginTop: 32,
    marginBottom: 20,
  },
  white: {
    color: 'white',
  },
  marginBottom: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    marginTop: 16,
  },
});
