/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import { Container, Fab, Icon, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { ProductDeatilsCard, Header } from '../../Components';
import { clearGetProductProps, getProduct } from '../../Redux/Actions/products';
import { logout } from '../../Redux/Actions/onBoarding';

const ProductList = (props) => {
  const [productList, setProductList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [active, setActive] = useState(false);
  const flatListRef = React.useRef();
  useEffect(() => {
    if (props.navigation.isFocused()) {
      if (props.products?.getProductResponse?.response) {
        props.clearGetProductProps();
        if (!props.products?.getProductResponse?.error) {
          setProductList([...props.products?.getProductResponse?.response]);
        } else if (props.products?.getProductResponse?.error) {
          Alert.alert(
            'Opps!',
            'Something went wrong \n please try again',
            [{ text: 'OK' }],
            {
              cancelable: false,
            },
          );
        }
      }
    }
  }, [props]);

  useEffect(() => {
    props.getProduct();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    props.getProduct();
    setRefreshing(false);
  };

  return (
    <Container style={styles.container}>
      <Header onPress={() => props.logout()} />
      <FlatList
        ref={flatListRef}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
        data={[...productList]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ProductDeatilsCard item={item} index={index} />
        )}
        ListEmptyComponent={<ActivityIndicator />}
      />

      <Fab
        active={active}
        direction="up"
        style={{ backgroundColor: '#000' }}
        position="bottomRight"
        onPress={() =>
          flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
        }>
        <Icon name="chevron-up" />
      </Fab>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
});

const mapStateToProps = ({ products }) => {
  return { products };
};
const mapDispatchToProps = {
  getProduct,
  clearGetProductProps,
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
