/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Icon,
  Button,
} from 'native-base';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';

// import dummy image
import Dummy from '../assets/img/home.jpeg';

export default function Home({ navigation }) {
  function readNewsDetail() {
    navigation.navigate('Detail');
  }

  return (
    <Container style={styles.parent}>
      <View>
        <Item style={styles.searchbar}>
          <Input
            placeholder="Search"
            style={[styles.fontSize_14, styles.padding]}
          />
          <Icon type="MaterialIcons" name="search" style={styles.padding} />
        </Item>
      </View>
      <Content>
        <View style={styles.card}>
          <View style={[styles.action, styles.padding]}>
            <TouchableOpacity>
              <Text style={[styles.fontSize_14, styles.bold, styles.blue]}>
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.fontSize_14, styles.bold, styles.red]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
          <Image source={Dummy} style={styles.newsImage} />
          <View style={styles.padding}>
            <TouchableOpacity onPress={readNewsDetail}>
              <Text style={[styles.bold, styles.marginBottom_8]}>
                Liga Inggris: James Rodriguez Buka-bukaan Alasan Pernah Tolak
                Gabung Manchester United
              </Text>
            </TouchableOpacity>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.fontSize_14}>
              Bola.com, Liverpool - Striker Everton, James Rodriguez, mengungkap
              fakta menarik menjelang duel melawan Manchester United di Liga
              Inggris, Sabtu (7/11/2020) malam.
            </Text>
          </View>
        </View>

        {/* dummy content */}
        <View style={styles.card}>
          <View style={[styles.action, styles.padding]}>
            <TouchableOpacity>
              <Text style={[styles.fontSize_14, styles.bold, styles.blue]}>
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.fontSize_14, styles.bold, styles.red]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
          <Image source={Dummy} style={styles.newsImage} />
          <View style={styles.padding}>
            <TouchableOpacity onPress={readNewsDetail}>
              <Text style={[styles.bold, styles.marginBottom_8]}>
                Liga Inggris: James Rodriguez Buka-bukaan Alasan Pernah Tolak
                Gabung Manchester United
              </Text>
            </TouchableOpacity>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.fontSize_14}>
              Bola.com, Liverpool - Striker Everton, James Rodriguez, mengungkap
              fakta menarik menjelang duel melawan Manchester United di Liga
              Inggris, Sabtu (7/11/2020) malam.
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={[styles.action, styles.padding]}>
            <TouchableOpacity>
              <Text style={[styles.fontSize_14, styles.bold, styles.blue]}>
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.fontSize_14, styles.bold, styles.red]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
          <Image source={Dummy} style={styles.newsImage} />
          <View style={styles.padding}>
            <TouchableOpacity onPress={readNewsDetail}>
              <Text style={[styles.bold, styles.marginBottom_8]}>
                Liga Inggris: James Rodriguez Buka-bukaan Alasan Pernah Tolak
                Gabung Manchester United
              </Text>
            </TouchableOpacity>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.fontSize_14}>
              Bola.com, Liverpool - Striker Everton, James Rodriguez, mengungkap
              fakta menarik menjelang duel melawan Manchester United di Liga
              Inggris, Sabtu (7/11/2020) malam.
            </Text>
          </View>
        </View>

        {/* pagination */}
        <View style={styles.pagination}>
          <Button style={styles.pageBtn} disabled>
            <Text>{'<'}</Text>
          </Button>
          <Text style={styles.fontSize_14}>
            {'    '}1{'    '}
          </Text>
          <Button style={styles.pageBtn}>
            <Text>{'>'}</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#F7F7F7',
  },
  bold: {
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
  },
  fontSize_14: {
    fontSize: 14,
  },
  fontSize_12: {
    fontSize: 12,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  newsImage: {
    resizeMode: 'cover',
    width: '100%',
    height: 175,
    marginTop: 10,
    marginBottom: 8,
  },
  marginBottom_8: {
    marginBottom: 8,
  },
  padding: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  card: {
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 1,
    borderWidth: 0.1,
    marginBottom: 16,
  },
  searchbar: {
    backgroundColor: 'white',
    marginBottom: 4,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  pageBtn: {
    borderRadius: 100,
    backgroundColor: '#2395FF',
  },
  blue: {
    color: '#2395FF',
  },
  red: {
    marginLeft: 16,
    color: '#DB3022',
  },
});
