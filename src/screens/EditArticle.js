import React, {useEffect, useState} from 'react';
import {Container, Content, Text, Item, Input, Button} from 'native-base';
import {Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';
import ImagePicker from 'react-native-image-picker';

// import actions
import newsAction from '../redux/actions/news';

export default function EditArticle({route, navigation}) {
  const {id} = route.params;
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const auth = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [imgData, setImgData] = useState(null);

  useEffect(() => {
    dispatch(newsAction.getNewsDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (news.newsDetailData) {
      setTitle(news.newsDetailData.title);
      setContent(news.newsDetailData.content);
      setImage(news.newsDetailData.image);
    }
  }, [news.newsDetailData]);

  useEffect(() => {
    if (news.isEdit) {
      Alert.alert('Edit article successful..');
      navigation.navigate('My_Article');
      dispatch(newsAction.resetEdit());
    }
  }, [dispatch, navigation, news.isEdit]);

  function selectImage() {
    let options = {
      title: 'Select your article image..',
      maxWidth: 512,
      maxHeight: 256,
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.fileSize > 500 * 1024) {
        Alert.alert(
          'Failed to pick image!',
          'Please choose image with file size less than 500 KB.',
        );
      } else {
        const source = {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        };
        setImgData(source);
        setImage(source.uri);
      }
    });
  }

  function doEditArticle() {
    const form = new FormData();
    form.append('title', title);
    form.append('content', content);
    if (imgData) {
      form.append('image', imgData);
    }

    dispatch(newsAction.editNews(id, auth.token, form));
  }

  return (
    <Container>
      <Content style={styles.padding}>
        <Text style={[styles.bold, styles.header]}>
          Edit your article here.
        </Text>
        <TouchableOpacity onPress={selectImage}>
          <Image
            source={{uri: !imgData ? `${API_URL}${image}` : image}}
            style={styles.newsImage}
          />
        </TouchableOpacity>
        <Text style={[styles.bold, styles.fontSize_14, styles.marginBottom]}>
          Title
        </Text>
        <Item regular style={styles.marginBottom}>
          <Input
            multiline={true}
            numberOfLines={3}
            style={styles.fontSize_14}
            value={title}
            onChangeText={(text) => setTitle(text)}
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
            value={content}
            onChangeText={(text) => setContent(text)}
          />
        </Item>
        <Button rounded block style={styles.btn} onPress={doEditArticle}>
          <Text style={styles.white}>Save Article</Text>
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
  newsImage: {
    resizeMode: 'cover',
    width: '100%',
    height: 175,
    marginBottom: 16,
  },
});
