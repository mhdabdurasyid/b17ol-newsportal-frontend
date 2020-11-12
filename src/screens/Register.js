import React, {useState, useEffect} from 'react';
import {Text, Button, Item, Input, Icon} from 'native-base';
import {Alert, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// import actions
import registerAction from '../redux/actions/auth';

export default function Register({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (auth.isRegister) {
      Alert.alert('Register succesful');
      navigation.navigate('Login');
      dispatch(registerAction.resetRegister());
    }
  });

  function doRegister() {
    const data = {
      name: fullname,
      email,
      password,
    };
    dispatch(registerAction.register(data));
  }

  return (
    <View style={styles.padding}>
      <Text style={[styles.center, styles.bold, styles.marginBottom]}>
        Sign Up
      </Text>
      <Text style={[styles.center, styles.fontSize_14, styles.marginBottom]}>
        Create your account to post article on Balbalan.
      </Text>
      <Item style={styles.marginBottom}>
        <Icon type="MaterialIcons" name="person" style={styles.blue} />
        <Input
          placeholder="Full Name"
          style={styles.fontSize_14}
          onChangeText={(text) => setFullname(text)}
        />
      </Item>
      <Item style={styles.marginBottom}>
        <Icon type="MaterialIcons" name="email" style={styles.blue} />
        <Input
          placeholder="Email"
          style={styles.fontSize_14}
          onChangeText={(text) => setEmail(text)}
        />
      </Item>
      <Item style={styles.marginBottom}>
        <Icon type="MaterialIcons" name="lock" style={styles.blue} />
        <Input
          placeholder="Password"
          secureTextEntry
          style={styles.fontSize_14}
          onChangeText={(text) => setPassword(text)}
        />
      </Item>
      <Button rounded block style={styles.btn} onPress={doRegister}>
        <Text style={styles.white}>{'  Sign Up  '}</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  fontSize_14: {
    fontSize: 14,
  },
  white: {
    color: 'white',
  },
  btn: {
    backgroundColor: '#2395FF',
    marginTop: 32,
  },
  marginBottom: {
    marginBottom: 16,
  },
  blue: {
    color: '#2395FF',
  },
  center: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});
