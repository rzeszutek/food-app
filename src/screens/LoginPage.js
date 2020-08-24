import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import * as firebase from 'firebase';

export class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            logged: false,
            errorMessage: null
        };
    }

    handleLogin = () => {
        const {email, password} = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                if (error.code === 'auth/invalid-password') {
                     return this.setState({errorMessage: error.message});
                }
                if (error.code === 'auth/invalid-email') {
                    return this.setState({errorMessage: error.message});
                }
                else {
                    return this.setState({errorMessage: error.message});
                }
            });

        firebase
            .auth()
            .onAuthStateChanged((user) => {
            if (user) {
                Navigation.push(this.props.componentId, {
                    component: {
                        name: 'RestaurantsPage',
                        options: {
                            topBar: {
                                title: {
                                    text: 'Restaurants'
                                }
                            }
                        }
                    }
                }).then()
            }
        });
    };

    render (){
        return (
          <SafeAreaView style={styles.container}>
              <View style={{flexDirection: 'column', paddingTop: 40, alignItems: 'center'}}>
                  <Image
                      source={require('../../assets/icons/login-icon.png')}
                  />
                  <TextInput style = {styles.inputEmail}
                             underlineColorAndroid = "transparent"
                             placeholder = "Email"
                             placeholderTextColor = "#9a73ef"
                             autoCapitalize = "none"
                             onChangeText={email => this.setState({email})}
                             value={this.state.email}
                  />
                  <TextInput secureTextEntry={true} style = {styles.inputPassword}
                             underlineColorAndroid = "transparent"
                             placeholder = "Password"
                             placeholderTextColor = "#9a73ef"
                             autoCapitalize = "none"
                             onChangeText={password => this.setState({password})}
                             value={this.state.password}
                  />
                  <Text style={styles.errorMessage}>
                      {this.state.errorMessage}
                  </Text>
              </View>
                <TouchableOpacity
                    style = {styles.submitButton}
                     onPress = {
                        () => this.handleLogin()
                     }>
                    <Text style = {styles.submitButtonText}> Log in </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style = {styles.forgotPasswordButton}
                  onPress={ () => Navigation.push(this.props.componentId, {
                      component: {
                          name: 'PasswordRecovery',
                          options: {
                              topBar: {
                                  title: {
                                      text: 'Password recovery'
                                  }
                              }
                          }
                      }
                  })}>
                  <Text style = {styles.submitButtonText}> I forgot my password </Text>
                </TouchableOpacity>
          </SafeAreaView>
        );
    }
}

export default LoginPage;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5dc'
    },
    inputEmail: {
        marginTop: 20,
        padding: 10,
        height: 45,
        borderColor: '#7a42f4',
        backgroundColor:'#f0ffff',
        borderWidth: 1,
        borderRadius: 15,
        width: 300
    },
    inputPassword: {
        marginTop: 20,
        padding: 10,
        height: 45,
        borderColor: '#7a42f4',
        backgroundColor:'#f0ffff',
        borderWidth: 1,
        borderRadius: 15,
        width: 300
    },
    submitButton: {
        position: 'absolute',
        marginTop: 330,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#f0ffff',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'gray',
        width: 300
    },
    forgotPasswordButton: {
        position: 'absolute',
        marginTop: 400,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#f0ffff',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'gray',
        width: 300
    },
    submitButtonText:{
        color: 'black',
        textAlign: 'center'
    },
    errorMessage: {
        textAlign: 'center',
        color: '#7a42f4',
        marginTop: 45
    }
}
