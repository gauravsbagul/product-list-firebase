/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import {
  Button,
  Container,
  Content,
  Input,
  InputGroup,
  Text,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import validator from 'validator';
import { Header } from '../../Components';
import {
  clearUploadProductProps,
  uploadProduct,
} from '../../Redux/Actions/products';
import { logout } from '../../Redux/Actions/onBoarding';

const AppProduct = (props) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (props.navigation.isFocused()) {
      if (props.products?.uploadProduct?.response) {
        if (!props.products?.uploadProduct?.error) {
          setProductName('');
          setProductPrice('');
          setImageUrl('');
          props.clearUploadProductProps();
          Alert.alert('Yoho!', 'Product added successfully', [{ text: 'OK' }], {
            cancelable: false,
          });
          setIsLoading(false);
        } else if (props.products?.uploadProduct?.error) {
          setIsLoading(false);
          props.clearUploadProductProps();
          Alert.alert(
            'Opps!',
            'Something went wrong while ading product',
            [{ text: 'OK' }],
            {
              cancelable: false,
            },
          );
        }
      }
    }
    return () => {};
  }, [props]);

  const onUploadProduct = () => {
    Keyboard.dismiss();
    if (!productName || !productPrice || !imageUrl) {
      Alert.alert(
        'Oops!',
        'Some fields are not properly filled',
        [{ text: 'OK' }],
        {
          cancelable: false,
        },
      );
    } else if (!validator.isURL(imageUrl)) {
      Alert.alert(
        'Oops!',
        'Invalid image url \n please add valid image url',
        [{ text: 'OK' }],
        {
          cancelable: false,
        },
      );
    } else {
      setIsLoading(true);
      const data = {
        productName,
        productPrice,
        imageUrl,
      };
      props.uploadProduct(data);
    }
  };

  return (
    <Container style={styles.container}>
      <Header onPress={() => props.logout()} />
      <Content>
        <View style={styles.productImageWrapper}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{ height: '99%', width: '99%' }}
            />
          ) : (
            <Text uppercase={false} style={{ color: 'blue' }}>
              Add Product Image URL below
            </Text>
          )}
        </View>

        <Button
          transparent
          onPress={() => selectProductImage()}
          style={{ alignSelf: 'center', marginTop: 10 }}>
          <Text uppercase={false} style={{ color: 'blue' }}>
            Pick Product Image
          </Text>
        </Button>

        <View style={styles.inputWrapper}>
          <InputGroup style={styles.inputGroup}>
            <Input
              placeholder="Product Image url"
              onChangeText={(url) => setImageUrl(url)}
              value={String(imageUrl)}
              keyboardType="default"
              returnKeyType="go"
              placeholderTextColor="#000"
              style={styles.inputText}
              blurOnSubmit={false}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </InputGroup>
        </View>
        <View style={styles.inputWrapper}>
          <InputGroup style={styles.inputGroup}>
            <Input
              placeholder="Product Name"
              onChangeText={(name) => setProductName(name)}
              value={String(productName)}
              keyboardType="default"
              returnKeyType="go"
              placeholderTextColor="#000"
              style={styles.inputText}
              blurOnSubmit={false}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </InputGroup>
        </View>
        <View style={styles.inputWrapper}>
          <InputGroup style={styles.inputGroup}>
            <Input
              placeholder="Product price"
              onChangeText={(price) => setProductPrice(price)}
              value={String(productPrice)}
              keyboardType="default"
              returnKeyType="go"
              placeholderTextColor="#000"
              style={styles.inputText}
              blurOnSubmit={false}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </InputGroup>
        </View>
        <Button
          disabled={isLoading}
          onPress={() => onUploadProduct()}
          style={styles.button}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text uppercase={false} style={{ color: '#000' }}>
              Add product
            </Text>
          )}
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  productImageWrapper: {
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#aaa',
    height: 200,
    width: 300,
    backgroundColor: '#eeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputGroup: {
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    marginVertical: 5,
  },
  inputText: {
    color: '#000',
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 200,
  },
});

const mapStateToProps = ({ products }) => {
  return { products };
};
const mapDispatchToProps = {
  uploadProduct,
  clearUploadProductProps,
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(AppProduct);
