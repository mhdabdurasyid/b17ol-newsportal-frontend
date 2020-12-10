import React, {useEffect} from 'react';
import {
  Container,
  Content,
  Text,
  Left,
  Right,
  Icon,
  Thumbnail,
  List,
  ListItem,
} from 'native-base';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';

// import actions
import authAction from '../redux/actions/auth';
import newsAction from '../redux/actions/news';
import profileAction from '../redux/actions/profile';

// import default avatar
import User from '../assets/img/avatar.png';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(profileAction.getProfile(auth.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function editProfile() {
    navigation.navigate('Edit_Profile');
  }

  function logout() {
    dispatch(authAction.logout());
    dispatch(newsAction.destroy());
    dispatch(profileAction.destroy());
  }

  return (
    <Container>
      <Content style={styles.padding}>
        <Text style={[styles.bold, styles.header]}>My Profile</Text>
        <View style={styles.user}>
          <Thumbnail
            source={
              profile.profileData.photo !== null
                ? {uri: `${API_URL}${profile.profileData.photo}`}
                : User
            }
            style={styles.avatar}
          />
          <View>
            <Text style={[styles.fontSize_14, styles.bold]}>
              {profile.profileData.name}
            </Text>
            <Text style={styles.fontSize_14}>{profile.profileData.email}</Text>
            <TouchableOpacity onPress={editProfile}>
              <Icon
                type="MaterialIcons"
                name="edit"
                style={styles.fontSize_14}
              />
            </TouchableOpacity>
          </View>
        </View>
        <List style={styles.listMargin}>
          <ListItem onPress={() => navigation.navigate('EditPassword')}>
            <Left>
              <Text style={styles.bold}>Change Password</Text>
            </Left>
            <Right>
              <Icon type="MaterialIcons" name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={logout}>
            <Left>
              <Text style={styles.bold}>Logout</Text>
            </Left>
            <Right>
              <Icon type="MaterialIcons" name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
    paddingBottom: 20,
  },
  fontSize_14: {
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  avatar: {
    marginRight: 12,
  },
  listMargin: {
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
  },
});
