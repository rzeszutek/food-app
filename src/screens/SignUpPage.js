import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import * as firebase from 'firebase';
import { Navigation } from 'react-native-navigation';
import firestore from '@react-native-firebase/firestore';

export class SignUpPage extends Component {

    state = {
        email: '',
        password: '',
        displayName: '',
        errorMessage: null
    };

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(cred => {
                firestore()
                    .collection('klienci')
                    .doc(this.state.email)
                    .set({
                        displayName: this.state.displayName,
                        password: this.state.password,
                        favourites: []
                    }).then();
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    return this.setState({errorMessage: error.message});
                }
                else if (error.code === 'auth/invalid-email') {
                    return this.setState({errorMessage: error.message});
                }
                else
                    return this.setState({errorMessage: error.message});
            });

            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .catch(error => {
                    return this.setState({errorMessage: error.message})
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

    render(){
        return(
            <View style={styles.container}>
                <Image
                    style={styles.icon}
                    source={require('../../assets/icons/registration-icon.png')}
                />
                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Display name"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText={displayName => this.setState({displayName})}
                           value={this.state.displayName}
                />
                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Email"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText={email => this.setState({email})}
                           value={this.state.email}
                />
                <TextInput secureTextEntry={true} style = {styles.input}
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
                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.handleSignUp()
                    }>
                    <Text style = {styles.submitButtonText}> Sign up </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SignUpPage;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5dc'
    },
    input: {
        marginTop: 40,
        height: 45,
        borderColor: '#7a42f4',
        backgroundColor:'#f0ffff',
        borderWidth: 1,
        borderRadius: 15,
        width: 300
    },
    submitButton: {
        marginTop: 20,
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
    icon: {
        marginTop: 30
    },
    errorMessage: {
        textAlign: 'center',
        color: '#7a42f4',
        marginTop: 45
    }
}
