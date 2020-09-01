/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import { Button, Text } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../Redux/Actions/onBoarding';

const ProductList = (props) => {
  useEffect(() => {
    console.log('ProductList -> props', props);
    return () => {};
  }, [props]);

  return (
    <View style={styles.container}>
      <Button onPress={() => props.logout()}>
        <Text>Logout</Text>
      </Button>
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

const mapStateToProps = ({}) => {
  return {};
};
const mapDispatchToProps = {
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
