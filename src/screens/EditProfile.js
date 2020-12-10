import React, {useEffect, useState} from 'react';
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Thumbnail,
  Icon,
} from 'native-base';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';
import ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';

// import actions
import profileAction from '../redux/actions/profile';

// import default avatar
import User from '../assets/img/avatar.png';

export default function EditProfile({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const schema = Yup.object().shape({
    name: Yup.string().required('Fullname field is required'),
    email: Yup.string()
      .email('Please enter correct email')
      .required('Email field is required'),
  });

  const [photo, setPhoto] = useState(profile.profileData.photo);
  const [imgData, setImgData] = useState(null);

  useEffect(() => {
    if (profile.isEdit) {
      Alert.alert('Success!', 'Edit profile succesfully.');
      dispatch(profileAction.resetEdit());
      dispatch(profileAction.getProfile(auth.token));
      navigation.navigate('Profile');
    }
  });

  function doEditProfile(values) {
    const form = new FormData();
    form.append('email', values.email);
    form.append('name', values.name);
    if (imgData) {
      form.append('image', imgData);
    }

    dispatch(profileAction.editProfile(form, auth.token));
  }

  function selectImage() {
    let options = {
      title: 'Choose your avatar..',
      maxWidth: 256,
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
        setPhoto(source.uri);
      }
    });
  }

  return (
    <Container>
      <Formik
        initialValues={{
          name: profile.profileData.name,
          email: profile.profileData.email,
        }}
        validationSchema={schema}
        onSubmit={(values) => doEditProfile(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <Content style={styles.padding}>
            <Text style={[styles.bold, styles.header]}>Edit your profile</Text>
            <View style={styles.avatar}>
              <TouchableOpacity onPress={selectImage}>
                <Thumbnail
                  large
                  source={
                    photo !== null
                      ? {
                          uri: photo.includes('upload')
                            ? `${API_URL}${photo}`
                            : photo,
                        }
                      : User
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={styles.marginBottom}>
              <Item>
                <Icon type="MaterialIcons" name="person" style={styles.blue} />
                <Input
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.fontSize_14}
                />
              </Item>
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
            </View>
            <View style={styles.marginBottom}>
              <Item>
                <Icon type="MaterialIcons" name="email" style={styles.blue} />
                <Input
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.fontSize_14}
                />
              </Item>
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>
            <Button rounded block style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.white}>{'  Save  '}</Text>
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
  bold: {
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    marginTop: 16,
  },
  avatar: {
    alignItems: 'center',
    marginBottom: 24,
  },
  marginBottom: {
    marginBottom: 16,
  },
  fontSize_14: {
    fontSize: 14,
  },
  blue: {
    color: '#2395FF',
  },
  white: {
    color: 'white',
  },
  btn: {
    backgroundColor: '#2395FF',
    marginTop: 32,
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
});
