import React, { Component }  from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import * as firebase from 'firebase';

export class StartScreen extends Component  {

    anonymousLogin = () => {
        firebase
            .auth()
            .signInAnonymously()
            .then(() => {
                console.log('User signed in anonymously');
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                    return console.log('Enable anonymous in your firebase console.');
                }
                else
                    return console.error(error);
            });

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
        }).then();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>FoodApp</Text>
                <Image
                    style={{top: 90}}
                    source={require('../../assets/icons/food-icon.png')}
            />
            <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.button}
                onPress={() => this.anonymousLogin()}>
                <Text style={styles.text}>Log in anonymously</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}

export default StartScreen;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5dc'
    },
    header: {
        color: '#6A5ACD',
        fontWeight: 'bold',
        fontSize: 40,
        top: 50
    },
    button: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#f0ffff',
        borderRadius:15,
        borderWidth: 2,
        borderColor: 'gray',
        width: 300
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontSize: 15
    }
}
