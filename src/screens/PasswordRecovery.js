import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import * as firebase from 'firebase';

export class PasswordRecovery extends Component{

    state = {
        email: '',
        errorMessage: '',
        info: ''
    }

    handleEmail = (text) => {
        this.setState({ email: text })
    }

    sendEmail = () => {
        firebase
            .auth()
            .sendPasswordResetEmail(this.state.email)
            .then(
                console.log('Password recovery link send.'),
                this.setState({info: 'Your recovery link was send on your email address.'})
            )
            .catch(error => {
                this.setState({errorMessage: error});
            });
    }

    render() {
        return (
          <View style={styles.container}>
              <Image
                  style={styles.icon}
                  source={require('../../assets/icons/forgot-password-icon.png')}
                  />
              <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           placeholder = "Email"
                           onChangeText = {this.handleEmail}/>
              <Text style={styles.text}> Please, insert your e-mail address.{"\n"}We will send to you {"\n"}password recovery link. </Text>
              <Text style={styles.textInfo}>
                  {this.state.info}
              </Text>
              <TouchableOpacity style={styles.sendButton}
               onPress = {
                   () => this.sendEmail(this.state.email)
               }>
                <Text style={styles.textButton}>Send recovery link</Text>
              </TouchableOpacity>
          </View>

        );
    }
}

export default PasswordRecovery;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5dc'
    },
    text: {
        marginTop: 40,
        textAlign: 'center',
        color: '#7a42f4',
        fontSize: 15
    },
    input: {
        padding: 10,
        marginTop: 30,
        height: 45,
        borderColor: '#7a42f4',
        backgroundColor: '#f0ffff',
        borderWidth: 1,
        borderRadius: 15,
        width: 300
    },
    sendButton: {
        marginTop: 50,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#f0ffff',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'gray',
        width: 180
    },
    textButton: {
        color: 'black',
        textAlign: 'center'
    },
    icon: {
        marginTop: 50
    },
    textInfo: {
        textAlign: 'center',
        color: '#7a42f4',
        fontSize: 15,
        marginTop: 25
    }
}
