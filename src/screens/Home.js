/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Text,
  Thumbnail,
  Item,
  Input,
  Icon,
  Spinner,
} from 'native-base';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '@env';
import dayjs from 'dayjs';

// import actions
import newsAction from '../redux/actions/news';

// import default avatar
import User from '../assets/img/avatar.png';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);

  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(newsAction.getAllNews(keyword));
  }, [dispatch, keyword]);

  useEffect(() => {
    if (news.allNewsData.length > 0) {
      if (news.allNewsPageInfo.currentPage === 1) {
        setData(news.allNewsData);
      } else {
        setData(data.concat(news.allNewsData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [news.allNewsPageInfo.currentPage, news.allNewsData.length]);

  useEffect(() => {
    if (refreshing) {
      setData(news.allNewsData);
      setRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [news.allNewsData]);

  function readNewsDetail(id) {
    dispatch(newsAction.resetNewsDetail());
    navigation.navigate('Detail', { id });
  }

  function loadMore() {
    if (news.allNewsPageInfo.nextLink) {
      dispatch(
        newsAction.getAllNews(keyword, news.allNewsPageInfo.currentPage + 1),
      );
    }
  }

  function doRefresh() {
    setRefreshing(true);
    dispatch(newsAction.getAllNews(''));
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
      {news.allNewsIsLoading && <Spinner color="#2395FF" />}
      {(news.allNewsIsError && news.allNewsData.length === 0) && (
        <View style={styles.isError}>
          <Text style={styles.padding}>There is no article or news!</Text>
        </View>
      )}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.author, styles.padding]}>
              <Thumbnail
                small
                source={
                  item.Author.photo !== null
                    ? { uri: `${API_URL}${item.Author.photo}` }
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
        onEndReached={async () => await loadMore()}
        onEndReachedThreshold={0.2}
        onRefresh={doRefresh}
        refreshing={refreshing}
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
  isError: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
