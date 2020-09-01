/* eslint-disable react-native/no-inline-styles */
import { Button, Container, Input, InputGroup, Text, View } from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../Redux/Actions/onBoarding';
import { Image } from '../../Assets';

const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

class LoginOrSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      email: '',
      password: '',
      hidePassword: true,
      hideConfirmPassword: true,
      isLoading: false,
      isAuthenticated: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var stateObj = prevState;
    if (
      !nextProps.authentication?.userLoggedOut &&
      !nextProps.authentication?.login?.error
    ) {
      stateObj.isLoading = false;
      stateObj.isAuthenticated = true;
    }

    return stateObj === prevState ? null : stateObj;
  }

  componentDidUpdate() {
    // if (this.state.isAuthenticated && !this.state.isLoading)
    //   this.props.navigation.navigate('TabNav');
  }

  handleLogin = async () => {
    const { email, password } = this.state;
    this.props.navigation.navigate('TabNav');
    // if (!email || !password) {
    //   Alert.alert(
    //     `Error`,
    //     `Please fill all the required fields`,
    //     [{ text: 'OK' }],
    //     {
    //       cancelable: false,
    //     },
    //   );
    // } else {
    //   if (!emailReg.test(email.trim())) {
    //     Alert.alert(
    //       'Unauthorized user',
    //       'Please enter valid Email Id',
    //       [{ text: 'OK' }],
    //       {
    //         cancelable: false,
    //       },
    //     );
    //   } else {
    //     this.setState({
    //       showLoader: true,
    //     });
    //     const data = {
    //       email,
    //       password,
    //     };
    //     this.props.login(data);
    //   }
    // }
  };

  render() {
    const {
      showLoader,
      hidePassword,
      hideConfirmPassword,
      isLogin,
    } = this.state;
    return (
      <>
        <ImageBackground
          style={styles.container}
          source={Image.firebase}
          resizeMode={'repeat'}>
          <>
            <View style={styles.inputWrapper}>
              <InputGroup style={styles.inputGroup}>
                <Input
                  placeholder="Email ID"
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                  keyboardType="email-address"
                  returnKeyType="done"
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
                  placeholder="Password"
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}
                  keyboardType="default"
                  returnKeyType="go"
                  secureTextEntry={hidePassword}
                  onSubmitEditing={isLogin ? () => this.handleLogin() : null}
                  placeholderTextColor="#000"
                  style={styles.inputText}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      hidePassword: !this.state.hidePassword,
                    })
                  }>
                  <Text uppercase style={{ marginRight: 10, color: '#000' }}>
                    {hidePassword ? 'Show' : 'Hide'}
                  </Text>
                </TouchableOpacity>
              </InputGroup>
            </View>

            {isLogin ? null : (
              <View style={styles.inputWrapper}>
                <InputGroup style={styles.inputGroup}>
                  <Input
                    placeholder="Confirm Password"
                    onChangeText={(confirmPassword) =>
                      this.setState({ confirmPassword })
                    }
                    value={this.state.confirmPassword}
                    keyboardType="default"
                    returnKeyType="go"
                    secureTextEntry={hideConfirmPassword}
                    placeholderTextColor="#000"
                    style={styles.inputText}
                    blurOnSubmit={false}
                    onSubmitEditing={() => Keyboard.dismiss()}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        hideConfirmPassword: !this.state.hideConfirmPassword,
                      })
                    }>
                    <Text uppercase style={{ marginRight: 10, color: '#000' }}>
                      {hidePassword ? 'Show' : 'Hide'}
                    </Text>
                  </TouchableOpacity>
                </InputGroup>
              </View>
            )}
            <TouchableOpacity
              style={styles.toggleLogin}
              onPress={() =>
                this.setState({
                  isLogin: !this.state.isLogin,
                })
              }>
              <Text uppercase style={styles.toggleLoginText}>
                {isLogin ? 'Signup' : 'Login'}
              </Text>
            </TouchableOpacity>
            <Button
              rounded
              style={styles.button}
              disabled={showLoader}
              onPress={() => this.handleLogin()}>
              {showLoader ? (
                <ActivityIndicator size="large" color="#FFFFFF" animating />
              ) : (
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  {isLogin ? 'Login' : 'Signup'}
                </Text>
              )}
            </Button>
          </>
        </ImageBackground>
      </>
    );
  }
}
const mapStateToProps = ({ authentication }) => {
  return { authentication };
};
const mapDispatchToProps = {
  login,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginOrSignup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  tabWrapper: {
    backgroundColor: '#0000',
    padding: 20,
    borderRadius: 20,
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
  toggleLogin: {
    alignSelf: 'flex-end',
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaa',
    borderRadius: 25,
  },
  toggleLoginText: {
    color: '#000',
    fontSize: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#5499C7',
    marginTop: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
