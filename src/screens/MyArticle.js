/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Text,
  Item,
  Input,
  Icon,
  Spinner,
} from 'native-base';
import { Image, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '@env';

// import actions
import newsAction from '../redux/actions/news';

export default function MyArticle({ navigation }) {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const auth = useSelector((state) => state.auth);

  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(newsAction.getNewsByUser(keyword, auth.token));
  }, [auth.token, dispatch, keyword]);

  useEffect(() => {
    if (news.userNewsData.length > 0) {
      if (news.userNewsPageInfo.currentPage === 1) {
        setData(news.userNewsData);
      } else {
        setData(data.concat(news.userNewsData));
      }
    }
  }, [news.userNewsPageInfo.currentPage, news.userNewsData.length]);

  function readNewsDetail(id) {
    dispatch(newsAction.resetNewsDetail());
    navigation.navigate('Detail', { id });
  }

  function editArticle() {
    navigation.navigate('Edit_Article');
  }

  function loadMore() {
    if (news.userNewsPageInfo.nextLink) {
      dispatch(newsAction.getNewsByUser(keyword, auth.token, news.userNewsPageInfo.currentPage + 1));
    }
  }

  return (
    <Container style={styles.parent}>
      <View>
        <Item style={styles.searchbar}>
          <Input
            placeholder="Search"
            style={[styles.fontSize_14, styles.padding]}
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
          />
          <Icon type="MaterialIcons" name="search" style={styles.padding} />
        </Item>
      </View>
      {news.userNewsIsLoading && <Spinner color="#2395FF" />}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.action, styles.padding]}>
              <TouchableOpacity onPress={editArticle}>
                <Text
                  style={[styles.fontSize_14, styles.bold, styles.blue]}>
                  Update
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[styles.fontSize_14, styles.bold, styles.red]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: `${API_URL}${item.image}` }}
              style={styles.newsImage}
            />
            <View style={styles.padding}>
              <TouchableOpacity onPress={() => readNewsDetail(item.id)}>
                <Text style={[styles.bold, styles.marginBottom_8]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.fontSize_14}>
                {item.content}
              </Text>
            </View>
          </View>
        )}
        onEndReached={async()=> await loadMore()}
        onEndReachedThreshold={0.2}
      />
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
