import React, {useEffect, useState} from 'react';
import {Container, Text, Item, Input, Icon, Spinner} from 'native-base';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// import actions
import newsAction from '../redux/actions/news';

// import components
import Card from '../components/card';

export default function Home({navigation}) {
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
    navigation.navigate('Detail', {id});
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
      {news.allNewsIsError && news.allNewsData.length === 0 && (
        <View style={styles.isError}>
          <Text style={styles.padding}>There is no article or news!</Text>
        </View>
      )}
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => readNewsDetail(item.id)}>
            <Card item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
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
  fontSize_14: {
    fontSize: 14,
  },
  padding: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  searchbar: {
    backgroundColor: 'white',
    marginBottom: 4,
  },
  isError: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
