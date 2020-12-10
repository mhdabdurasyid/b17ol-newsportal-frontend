import React, {useEffect} from 'react';
import {Text, Button, Item, Input, Icon} from 'native-base';
import {Alert, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

// import actions
import loginAction from '../redux/actions/auth';

export default function Login() {
  const dispatch = useDispatch();
  const {isError} = useSelector((state) => state.auth);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter correct email')
      .required('Email field is required'),
    password: Yup.string()
      .min(6, 'Password required at least 6 characters')
      .max(20, 'Password required max 20 characters')
      .required('Password field is required'),
  });

  function doLogin(data) {
    dispatch(loginAction.login(data));
  }

  useEffect(() => {
    if (isError) {
      Alert.alert('Login failed!', 'Email or password is wrong.');
      dispatch(loginAction.reset());
    }
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={(values) => doLogin(values)}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <View style={styles.padding}>
          <Text style={[styles.center, styles.bold, styles.marginBottom]}>
            Login
          </Text>
          <Text
            style={[styles.center, styles.fontSize_14, styles.marginBottom]}>
            Login to your existing account to access all the features in
            Balbalan.
          </Text>
          <View style={styles.marginBottom}>
            <Item>
              <Icon type="MaterialIcons" name="email" style={styles.blue} />
              <Input
                placeholder="Email"
                style={styles.fontSize_14}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </Item>
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.marginBottom}>
            <Item>
              <Icon type="MaterialIcons" name="lock" style={styles.blue} />
              <Input
                placeholder="Password"
                secureTextEntry
                style={styles.fontSize_14}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </Item>
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.marginBottom}>
            <Text style={[styles.fontSize_14, styles.textRight]}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <Button rounded block style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.white}>{'  Login  '}</Text>
          </Button>
        </View>
      )}
    </Formik>
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
  textRight: {
    textAlign: 'right',
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
});
