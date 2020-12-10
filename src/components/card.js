import React from 'react';
import {Text, Thumbnail} from 'native-base';
import {Image, View, StyleSheet} from 'react-native';
import {API_URL} from '@env';
import dayjs from 'dayjs';

// import default avatar
import User from '../assets/img/avatar.png';

export default function card({item}) {
  return (
    <View style={styles.card}>
      <View style={[styles.author, styles.padding]}>
        <Thumbnail
          small
          source={
            item.Author.photo !== null
              ? {uri: `${API_URL}${item.Author.photo}`}
              : User
          }
          style={styles.avatar}
        />
        <View>
          <Text style={[styles.fontSize_12, styles.bold]}>
            {item.Author.name}
          </Text>
          <Text style={styles.fontSize_12}>
            {dayjs(item.createdAt).format('D MMM YYYY HH.mm')}
          </Text>
        </View>
      </View>
      <Image
        source={{uri: `${API_URL}${item.image}`}}
        style={styles.newsImage}
      />
      <View style={styles.padding}>
        <Text style={[styles.bold, styles.marginBottom_8]}>{item.title}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.fontSize_14}>
          {item.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
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
});
