import React, {useEffect, useState} from 'react';
import {Container, Content, Text, Item, Input, Button} from 'native-base';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';

// import actions
import newsAction from '../redux/actions/news';

export default function PostArticle({navigation}) {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const auth = useSelector((state) => state.auth);

  const schema = Yup.object().shape({
    title: Yup.string().required('Title field is required'),
    content: Yup.string().required('Content field is required'),
  });

  const [image, setImage] = useState('');
  const [imgData, setImgData] = useState(null);

  useEffect(() => {
    if (news.isPost) {
      Alert.alert('Success!', 'Create article successfully.');
      dispatch(newsAction.getNewsByUser('', auth.token));
      navigation.navigate('Private_Home');
      dispatch(newsAction.resetPost());
      setImage('');
      setImgData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function doPostArticle(values) {
    if (imgData) {
      const form = new FormData();
      form.append('title', values.title);
      form.append('content', values.content);
      form.append('image', imgData);
      dispatch(newsAction.postNews(form, auth.token));
    } else {
      Alert.alert('Image required!', 'Please choose an article image.');
    }
  }

  return (
    <Container>
      <Formik
        initialValues={{
          title: '',
          content: '',
        }}
        validationSchema={schema}
        onSubmit={(values, {resetForm}) => {
          resetForm({values: ''});
          doPostArticle(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <Content style={styles.padding}>
            <Text style={[styles.bold, styles.header]}>
              Write your article here.
            </Text>
            {imgData && image !== '' && (
              <Image source={{uri: image}} style={styles.newsImage} />
            )}
            <Button
              small
              block
              rounded
              style={styles.btnUpload}
              onPress={selectImage}>
              <Text>Choose article image</Text>
            </Button>
            <Text
              style={[styles.bold, styles.fontSize_14, styles.marginBottom]}>
              Title
            </Text>
            <View style={styles.marginBottom}>
              <Item regular>
                <Input
                  multiline={true}
                  numberOfLines={3}
                  style={styles.fontSize_14}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                />
              </Item>
              {touched.title && errors.title && (
                <Text style={styles.error}>{errors.title}</Text>
              )}
            </View>
            <Text
              style={[styles.bold, styles.fontSize_14, styles.marginBottom]}>
              Content/Description
            </Text>
            <View style={styles.marginBottom}>
              <Item regular>
                <Input
                  multiline={true}
                  numberOfLines={9}
                  style={styles.fontSize_14}
                  onChangeText={handleChange('content')}
                  onBlur={handleBlur('content')}
                  value={values.content}
                />
              </Item>
              {touched.content && errors.content && (
                <Text style={styles.error}>{errors.content}</Text>
              )}
            </View>
            <Button rounded block style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.white}>Post Article</Text>
            </Button>
          </Content>
        )}
      </Formik>
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
  error: {
    fontSize: 12,
    color: 'red',
  },
});
