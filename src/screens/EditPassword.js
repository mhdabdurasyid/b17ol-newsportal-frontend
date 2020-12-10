import React, {useEffect} from 'react';
import {Container, Content, Text, Item, Input, Button, Icon} from 'native-base';
import {View, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

// import actions
import profileAction from '../redux/actions/profile';

export default function EditPassword({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const {isEdit, editIsError} = useSelector((state) => state.profile);

  const schema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6, 'Password required at least 6 characters')
      .max(20, 'Password required max 20 characters')
      .required('Required field'),
    newPassword: Yup.string()
      .min(6, 'Password required at least 6 characters')
      .max(20, 'Password required max 20 characters')
      .required('Required field'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'New password must match')
      .required('Required field'),
  });

  function changePassword(data) {
    dispatch(profileAction.updatePassword(data, token));
  }

  useEffect(() => {
    if (isEdit) {
      Alert.alert(
        'Change password success!',
        'Your password has been changed.',
      );
      dispatch(profileAction.resetEdit());
      navigation.navigate('Profile');
    }

    if (editIsError) {
      Alert.alert(
        'Change password failed!',
        'Your old password is wrong, please enter it correctly.',
      );
      dispatch(profileAction.resetEdit());
    }
  });

  return (
    <Container>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => changePassword(values)}>
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
              Change your password
            </Text>
            <View style={styles.marginBottom}>
              <Item>
                <Icon type="MaterialIcons" name="lock" style={styles.blue} />
                <Input
                  onChangeText={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}
                  value={values.oldPassword}
                  style={styles.fontSize_14}
                  placeholder="Old password"
                  secureTextEntry
                />
              </Item>
              {touched.oldPassword && errors.oldPassword && (
                <Text style={styles.error}>{errors.oldPassword}</Text>
              )}
            </View>
            <View style={styles.marginBottom}>
              <Item>
                <Icon type="MaterialIcons" name="lock" style={styles.blue} />
                <Input
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  style={styles.fontSize_14}
                  placeholder="New password"
                  secureTextEntry
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
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  style={styles.fontSize_14}
                  placeholder="Confirm new password"
                  secureTextEntry
                />
              </Item>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
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
