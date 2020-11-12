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

// import actions
import profileAction from '../redux/actions/profile';

// import default avatar
import User from '../assets/img/avatar.png';

export default function EditProfile({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const [name, setName] = useState(profile.profileData.name);
  const [email, setEmail] = useState(profile.profileData.email);
  const [photo, setPhoto] = useState(profile.profileData.photo);
  const [imgData, setImgData] = useState(null);

  useEffect(() => {
    if (profile.isEdit) {
      Alert.alert('Edit profile succesful..');
      dispatch(profileAction.resetEdit());
      dispatch(profileAction.getProfile(auth.token));
      navigation.navigate('Profile');
    }
  });

  function doEditProfile() {
    const form = new FormData();
    form.append('email', email);
    form.append('name', name);
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
        setPhoto(source.uri);
      }
    });
  }

  return (
    <Container>
      <Content style={styles.padding}>
        <Text style={[styles.bold, styles.header]}>Edit your profile</Text>
        <View style={styles.avatar}>
          <TouchableOpacity onPress={selectImage}>
            <Thumbnail
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
        <Item style={styles.marginBottom}>
          <Icon type="MaterialIcons" name="person" style={styles.blue} />
          <Input
            value={name}
            style={styles.fontSize_14}
            onChangeText={(text) => setName(text)}
          />
        </Item>
        <Item style={styles.marginBottom}>
          <Icon type="MaterialIcons" name="email" style={styles.blue} />
          <Input
            value={email}
            style={styles.fontSize_14}
            onChangeText={(text) => setEmail(text)}
          />
        </Item>
        <Button rounded block style={styles.btn} onPress={doEditProfile}>
          <Text style={styles.white}>{'  Save  '}</Text>
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
});
