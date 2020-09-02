import { Text, View } from 'native-base';
import React from 'react';
import { ImageBackground, StyleSheet, StatusBar } from 'react-native';
import * as helpers from '../Helpers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ProductDeatilsCard = (props) => {
  const { item, index } = props;

  return (
    <View style={styles.productWrapper}>
      <ImageBackground
        source={{ uri: item.data.imageUrl }}
        imageStyle={{ height: '100%', width: '100%', borderRadius: 20 }}
        style={styles.productImage}>
        <View style={styles.productDetails}>
          <Text style={styles.nameAndPrice}>{item.data.productName}</Text>
          <Text style={styles.nameAndPrice}>{item.data.productPrice}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export const Header = (props) => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={props.onPress}>
          <AntDesign name="poweroff" color={'#fff'} size={25} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  productWrapper: {
    height: 250,
    width: helpers.DEVICE_WIDTH - 40,
    borderRadius: 25,
    margin: 10,
  },
  productImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    borderRadius: 20,
  },
  productDetails: {
    height: 50,
    backgroundColor: '#0105',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  nameAndPrice: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  header: {
    backgroundColor: '#03396C',
    height: helpers.isIos(80, 50),
    width: '100%',
    paddingTop: helpers.isIos(20, 0),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 30,
  },
});
