import React from 'react';
import {Text, Button} from 'native-base';
import {Image, View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

// import actions
import newsAction from '../redux/actions/news';

// import default logo
import Logo from '../assets/img/logo.png';

export default function Root({navigation}) {
  const dispatch = useDispatch();

  function goToHome() {
    dispatch(newsAction.destroy());
    navigation.navigate('Public_Home');
  }

  function goToLogin() {
    navigation.navigate('Login');
  }

  function goToRegister() {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.content}>
      <Image source={Logo} style={styles.logo} />
      <View>
        <Button bordered rounded style={styles.btnBorder} onPress={goToHome}>
          <Text style={styles.blue}>
            {'             Read Article             '}
          </Text>
        </Button>
      </View>
      <View style={styles.auth}>
        <Button rounded style={styles.btn} onPress={goToRegister}>
          <Text style={styles.white}>{'  Sign Up  '}</Text>
        </Button>
        <Text>{'    '}</Text>
        <Button rounded style={styles.btn} onPress={goToLogin}>
          <Text style={styles.white}>{'    Login    '}</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 40,
    resizeMode: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  white: {
    color: 'white',
  },
  blue: {
    color: '#2395FF',
  },
  btn: {
    backgroundColor: '#2395FF',
  },
  btnBorder: {
    borderColor: '#2395FF',
    marginBottom: 40,
    marginTop: 40,
  },
  auth: {
    flexDirection: 'row',
  },
});
