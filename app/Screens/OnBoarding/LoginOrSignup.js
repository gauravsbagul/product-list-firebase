/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  Container,
  Content,
  Input,
  InputGroup,
  Text,
  View,
} from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Image } from '../../Assets';
import {
  clearSignInProps,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '../../Redux/Actions/onBoarding';

const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

const initialState = {
  isLogin: true,
  email: '',
  password: '',
  hidePassword: true,
  hideConfirmPassword: true,
  isLoading: false,
  errorMessage: '',
};
class LoginOrSignup extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var stateObj = prevState;
    if (nextProps.auth?.login?.response && nextProps.auth?.login?.error) {
      stateObj.isLoading = false;

      let error = nextProps.auth?.login?.response?.code;

      switch (error) {
        case 'auth/email-already-in-use':
          Alert.alert(
            'Oops!',
            'Email address is already in use',
            [{ text: 'OK' }],
            {
              cancelable: false,
            },
          );
          break;
        case 'auth/invalid-email':
          Alert.alert('Oops!', 'Email address is invalid', [{ text: 'OK' }], {
            cancelable: false,
          });
          break;
        case 'auth/wrong-password':
          Alert.alert('Oops!', 'Wrong password', [{ text: 'OK' }], {
            cancelable: false,
          });
        default:
          Alert.alert('Oops!', 'Something went Wrong', [{ text: 'OK' }], {
            cancelable: false,
          });
          break;
      }
    }

    return stateObj === prevState ? null : stateObj;
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('blur', (event) => {
      this.setState({ ...initialState });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidUpdate() {
    if (this.props.auth?.login?.response) {
      this.props.clearSignInProps();
    }
  }

  handleLoginOrSignup = async () => {
    const { email, password, isLogin, confirmPassword } = this.state;
    if (!email || !password || (!isLogin && !confirmPassword)) {
      Alert.alert(
        'Oops!',
        'Looks like you forgot to fill all the required fields',
        [{ text: 'OK' }],
        {
          cancelable: false,
        },
      );
    } else {
      if (!emailReg.test(email.trim())) {
        Alert.alert(
          'Oops!',
          'Email Id is not in valid format',
          [{ text: 'OK' }],
          {
            cancelable: false,
          },
        );
      } else if (!isLogin && password !== confirmPassword) {
        Alert.alert(
          'Oops!',
          'Password and confirm password must match',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      } else if (password.length < 9) {
        Alert.alert(
          'Oops!',
          'Password must be more than 9 charachters',
          [{ text: 'OK' }],
          {
            cancelable: false,
          },
        );
      } else {
        this.setState({
          isLoading: true,
        });
        isLogin
          ? this.props.signInWithEmailAndPassword(email, password)
          : this.props.createUserWithEmailAndPassword(email, password);
      }
    }
  };

  render() {
    const {
      isLoading,
      hidePassword,
      hideConfirmPassword,
      isLogin,
    } = this.state;
    return (
      <>
        <Container>
          <ImageBackground
            style={styles.container}
            source={Image.firebase}
            resizeMode={'cover'}>
            <StatusBar barStyle={'light-content'} />
            <Content contentContainerStyle={styles.container}>
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
                      <Text
                        uppercase
                        style={{ marginRight: 10, color: '#000' }}>
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
                disabled={isLoading}
                onPress={() => this.handleLoginOrSignup()}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#FFFFFF" animating />
                ) : (
                  <Text style={{ fontSize: 20 }}>
                    {isLogin ? 'Login' : 'Signup'}
                  </Text>
                )}
              </Button>
            </Content>
          </ImageBackground>
        </Container>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
};
const mapDispatchToProps = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  clearSignInProps,
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
