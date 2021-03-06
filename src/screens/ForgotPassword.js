import React, {useEffect} from 'react';
import {Text, Button, Item, Input, Icon} from 'native-base';
import {Alert, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

// import actions
import authAction from '../redux/actions/auth';

export default function ForgotPassword({navigation}) {
  const dispatch = useDispatch();
  const {isEmailError, emailValidData} = useSelector((state) => state.auth);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter correct email')
      .required('Email field is required'),
  });

  function checkEmail(data) {
    dispatch(authAction.forgotPassword(data));
  }

  useEffect(() => {
    if (isEmailError) {
      Alert.alert(
        'Email not found!',
        'There is no email registered yet, please enter your correct email address.',
      );
      dispatch(authAction.reset());
    }

    if (emailValidData.id) {
      navigation.navigate('ResetPassword', {id: emailValidData.id});
      dispatch(authAction.reset());
    }
  });

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={schema}
      onSubmit={(values) => checkEmail(values)}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <View style={styles.padding}>
          <Text style={[styles.center, styles.bold, styles.marginBottom]}>
            Forgot Password
          </Text>
          <Text
            style={[styles.center, styles.fontSize_14, styles.marginBottom]}>
            Do you forgot your password? Please type your correct email address
            to reset your password.
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
          <Button rounded block style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.white}>{'  Forgot Password  '}</Text>
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
