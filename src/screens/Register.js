import React, {useEffect} from 'react';
import {Text, Button, Item, Input, Icon} from 'native-base';
import {Alert, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

// import actions
import registerAction from '../redux/actions/auth';

export default function Register({navigation}) {
  const dispatch = useDispatch();
  const {isRegister, registerIsError} = useSelector((state) => state.auth);

  const schema = Yup.object().shape({
    name: Yup.string().required('Fullname field is required'),
    email: Yup.string()
      .email('Please enter correct email')
      .required('Email field is required'),
    password: Yup.string()
      .min(6, 'Password required at least 6 characters')
      .max(20, 'Password required max 20 characters')
      .required('Password field is required'),
  });

  useEffect(() => {
    if (isRegister) {
      Alert.alert('Register success!', 'Please login first.');
      navigation.navigate('Login');
      dispatch(registerAction.reset());
    }

    if (registerIsError) {
      Alert.alert(
        'Register failed!',
        'Something is wrong or email is already used, please try again.',
      );
      dispatch(registerAction.reset());
    }
  });

  function doRegister(data) {
    dispatch(registerAction.register(data));
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={(values) => doRegister(values)}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <View style={styles.padding}>
          <Text style={[styles.center, styles.bold, styles.marginBottom]}>
            Sign Up
          </Text>
          <Text
            style={[styles.center, styles.fontSize_14, styles.marginBottom]}>
            Create your account to post article on Balbalan.
          </Text>
          <View style={styles.marginBottom}>
            <Item>
              <Icon type="MaterialIcons" name="person" style={styles.blue} />
              <Input
                placeholder="Full Name"
                style={styles.fontSize_14}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
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
          <Button rounded block style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.white}>{'  Sign Up  '}</Text>
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
  error: {
    fontSize: 12,
    color: 'red',
  },
});
