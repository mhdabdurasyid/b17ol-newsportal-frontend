/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Container, Content, Text, Item, Input, Button } from 'native-base';
import { Alert, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

// import actions
import newsAction from '../redux/actions/news';

export default function PostArticle({ navigation }) {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const auth = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [imgData, setImgData] = useState(null);

  useEffect(() => {
    if (news.isPost) {
      Alert.alert('Create article successful..');
      navigation.navigate('Private_Home');
      dispatch(newsAction.resetPost());
      setTitle('');
      setContent('');
      setImage('');
      setImgData(null);
    }
  }, [dispatch, navigation, news.isPost]);

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
        Alert.alert("You didn't select any image");
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
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

  function doPostArticle() {
    const form = new FormData();
    form.append('title', title);
    form.append('content', content);
    form.append('image', imgData);

    dispatch(newsAction.postNews(form, auth.token));
  }

  return (
    <Container>
      <Content style={styles.padding}>
        <Text style={[styles.bold, styles.header]}>
          Write your article here.
        </Text>
        {imgData && image !== '' && (
          <Image source={{ uri: image }} style={styles.newsImage} />
        )}
        <Button
          small
          block
          rounded
          style={styles.btnUpload}
          onPress={selectImage}>
          <Text>Choose article image</Text>
        </Button>
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
        <Button rounded block style={styles.btn} onPress={doPostArticle}>
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
  newsImage: {
    resizeMode: 'cover',
    width: '100%',
    height: 175,
    marginBottom: 8,
  },
  btnUpload: {
    marginBottom: 24,
    backgroundColor: '#2395FF',
  },
});
