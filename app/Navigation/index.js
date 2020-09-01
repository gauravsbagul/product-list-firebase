import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Splash from '../Screens/OnBoarding/Splash';
import LoginOrSignup from '../Screens/OnBoarding/LoginOrSignup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const ProdustList = () => {
  return (
    <View style={styles.container}>
      <Text>ProdustList</Text>
    </View>
  );
};

const CreateProduct = () => {
  return (
    <View style={styles.container}>
      <Text>CreateProduct</Text>
    </View>
  );
};

const screenOptions = {
  headerShown: false,
};

const TabNav = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'ProdustList') {
            iconName = focused ? 'heart' : 'heart-o';
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === 'CreateProduct') {
            iconName = focused ? 'pencil-square' : 'pencil-square-o';
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="ProdustList" component={ProdustList} />
      <Tab.Screen name="CreateProduct" component={CreateProduct} />
    </Tab.Navigator>
  );
};

const AuthStack = createStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          ...screenOptions,
        }}>
        <AuthStack.Screen name="Splash" component={Splash} />
        <AuthStack.Screen name="LoginOrSignup" component={LoginOrSignup} />
        <AuthStack.Screen name="TabNav" component={TabNav} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = ({ authentication }) => {
  return { authentication };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps)(StackNav);
