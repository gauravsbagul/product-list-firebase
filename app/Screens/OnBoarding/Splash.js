/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Splash = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    console.log('onAuthStateChanged -> user', user);
    setUser(user);
    setTimeout(() => {
      props.navigation.dispatch(
        CommonActions.navigate({
          name: user ? 'TabNav' : 'LoginOrSignup',
        }),
      );
    }, 2000);

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" animating />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = {
  // isLoggedIn,
};
export default Splash;
