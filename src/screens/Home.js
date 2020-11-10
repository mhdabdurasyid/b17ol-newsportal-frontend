/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {
  Container,
  Content,
  Text,
  Thumbnail,
  Item,
  Input,
  Icon,
  Button,
  Spinner,
} from 'native-base';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '@env';

// import actions
import newsAction from '../redux/actions/news';

// import default avatar
import User from '../assets/img/avatar.png';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(newsAction.getAllNews());
  }, [dispatch]);

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
        {news.allNewsIsLoading && <Spinner color="#2395FF" />}
        {news.allNewsData.length > 0 &&
          news.allNewsData.map((article) => {
            return (
              <View style={styles.card} key={article.id}>
                <View style={[styles.author, styles.padding]}>
                  <Thumbnail
                    small
                    source={
                      article.Author.photo !== null
                        ? { uri: `${API_URL}${article.Author.photo}` }
                        : User
                    }
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={[styles.fontSize_12, styles.bold]}>
                      {article.Author.name}
                    </Text>
                    <Text style={styles.fontSize_12}>{article.createdAt}</Text>
                  </View>
                </View>
                <Image
                  source={{ uri: `${API_URL}${article.image}` }}
                  style={styles.newsImage}
                />
                <View style={styles.padding}>
                  <TouchableOpacity onPress={readNewsDetail}>
                    <Text style={[styles.bold, styles.marginBottom_8]}>
                      {article.title}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.fontSize_14}>
                    {article.content}
                  </Text>
                </View>
              </View>
            );
          })}

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
});
