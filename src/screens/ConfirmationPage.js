import React, { Component } from 'react';
import {View, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';

export class ConfirmationPage extends Component {

    navigate = () => {
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
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Your order has been sent.
                </Text>
                <TouchableOpacity style={styles.submitButton} onPress={ () => this.navigate()}>
                    <Text style={styles.text}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ConfirmationPage;

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f5f5dc',
        padding: 30
    },
    header: {
        color: '#6A5ACD',
        textAlign: 'center',
        marginTop: 150,
        fontSize: 20
    },
    submitButton: {
        alignSelf: 'center',
        marginTop: 50,
        paddingTop: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#f0ffff',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'gray',
        width: 300
    },
    text: {
        textAlign: 'center',
        color: '#6A5ACD',
        fontSize: 18,
        marginBottom: 15
    }
}
