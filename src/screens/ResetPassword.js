import React, {useEffect} from 'react';
import {Text, Button, Item, Input, Icon} from 'native-base';
import {Alert, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

// import actions
import authAction from '../redux/actions/auth';

export default function ResetPassword({route, navigation}) {
  const {id} = route.params;
  const dispatch = useDispatch();
  const {isReset} = useSelector((state) => state.auth);

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Password required 6 characters')
      .max(20, 'Password required max 20 characters')
      .required('Required field'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'New password must match')
      .required('Required field'),
  });

  function doResetPassword(data) {
    dispatch(authAction.resetPassword(id, data));
  }

  useEffect(() => {
    if (isReset) {
      Alert.alert('Reset password success!', 'Please login to continue.');
      navigation.navigate('Login');
      dispatch(authAction.reset());
    }
  });

  return (
    <Formik
      initialValues={{
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={schema}
      onSubmit={(values) => doResetPassword(values)}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <View style={styles.padding}>
          <Text style={[styles.center, styles.bold, styles.marginBottom]}>
            Reset Password
          </Text>
          <Text
            style={[styles.center, styles.fontSize_14, styles.marginBottom]}>
            Enter your new password and confirm it.
          </Text>
          <View style={styles.marginBottom}>
            <Item>
              <Icon type="MaterialIcons" name="lock" style={styles.blue} />
              <Input
                placeholder="New password"
                secureTextEntry
                style={styles.fontSize_14}
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
              />
            </Item>
            {touched.newPassword && errors.newPassword && (
              <Text style={styles.error}>{errors.newPassword}</Text>
            )}
          </View>
          <View style={styles.marginBottom}>
            <Item>
              <Icon type="MaterialIcons" name="lock" style={styles.blue} />
              <Input
                placeholder="Confirm password"
                secureTextEntry
                style={styles.fontSize_14}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
            </Item>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}
          </View>
          <Button rounded block style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.white}>{'  Reset Password  '}</Text>
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
