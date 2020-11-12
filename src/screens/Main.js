import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';

// import screens
import Root from './Root';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Detail from './Detail';
import PostArticle from './PostArticle';
import MyArticle from './MyArticle';
import EditArticle from './EditArticle';
import Profile from './Profile';
import EditProfile from './EditProfile';

// import navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

function PrivateStackScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2395FF',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Private_Home"
        component={Home}
        options={{
          tabBarIcon: (focused, color, size) => (
            <Icon type="MaterialIcons" name="home" size={size} color={color} />
          ),
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Post_Article"
        component={PostArticle}
        options={{
          tabBarIcon: (focused, color, size) => (
            <Icon
              type="MaterialIcons"
              name="add-circle"
              size={size}
              color={color}
            />
          ),
          title: 'Article',
        }}
      />
      <Tab.Screen
        name="My_Article"
        component={MyArticle}
        options={{
          tabBarIcon: (focused, color, size) => (
            <Icon
              type="MaterialIcons"
              name="subject"
              size={size}
              color={color}
            />
          ),
          title: 'My Article',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (focused, color, size) => (
            <Icon
              type="MaterialIcons"
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Main() {
  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {!auth.isLogin ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={Root}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Public_Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <MainStack.Navigator>
          <MainStack.Screen
            name="Main"
            component={PrivateStackScreen}
            options={{headerShown: false}}
          />
          <MainStack.Screen
            name="Detail"
            component={Detail}
            options={{headerShown: false}}
          />
          <MainStack.Screen
            name="Edit_Article"
            component={EditArticle}
            options={{headerShown: false}}
          />
          <MainStack.Screen
            name="Edit_Profile"
            component={EditProfile}
            options={{headerShown: false}}
          />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
}
