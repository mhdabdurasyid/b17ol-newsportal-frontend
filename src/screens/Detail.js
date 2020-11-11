/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Container, Content, Text, Thumbnail, Spinner } from 'native-base';
import { Image, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '@env';
import dayjs from 'dayjs';

// import actions
import newsAction from '../redux/actions/news';

// import default avatar
import User from '../assets/img/avatar.png';

export default function Detail({ route }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(newsAction.getNewsDetail(id));
  }, [dispatch, id]);

  return (
    <Container>
      {news.newsDetailIsLoading && <Spinner color="#2395FF" />}
      <Content>
        <Image
          source={{ uri: `${API_URL}${news.newsDetailData.image}` }}
          style={styles.newsImage}
        />
        <View style={styles.padding}>
          <Text style={[styles.bold, styles.marginBottom_8]}>
            {news.newsDetailData.title}
          </Text>
          <Text style={[styles.fontSize_14, styles.marginBottom_20]}>
            {news.newsDetailData.content}
          </Text>
        </View>
        {news.newsDetailData.Author && (
          <View style={[styles.author, styles.padding]}>
            <Thumbnail
              source={
                news.newsDetailData.Author.photo !== null
                  ? { uri: `${API_URL}${news.newsDetailData.Author.photo}` }
                  : User
              }
              style={styles.avatar}
            />
            <View>
              <Text style={[styles.fontSize_14, styles.bold, styles.white]}>
                Written By
              </Text>
              <Text style={[styles.fontSize_12, styles.bold, styles.white]}>
                {news.newsDetailData.Author.name}
              </Text>
              <Text style={[styles.fontSize_12, styles.white]}>
                {dayjs(news.newsDetailData.createdAt).format(
                  'D MMM YYYY HH.mm',
                )}
              </Text>
            </View>
          </View>
        )}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
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
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#2395FF',
  },
  avatar: {
    marginRight: 10,
  },
  newsImage: {
    resizeMode: 'cover',
    width: '100%',
    height: 175,
    marginBottom: 8,
  },
  marginBottom_8: {
    marginBottom: 8,
  },
  padding: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  marginBottom_20: {
    marginBottom: 20,
  },
  white: {
    color: 'white',
  },
});
