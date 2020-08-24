import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Navigation} from 'react-native-navigation';

export class OrderPage extends Component {

    constructor() {
        super();

        this.state = {
            name: '',
            surname: '',
            city: '',
            street: '',
            phoneNumber: '',
            dishes: [],
            price: '',
            errorMessage: ''
        }
    }

    async componentDidMount(): void {
        await this.setState({
            dishes: this.state.dishes.concat(this.props.dishes),
            price: this.props.price
        })
    }

    sendOrder = async () => {

        if(this.state.name == '' || this.state.surname == '' || this.state.city == '' || this.state.stream == '' || this.state.phoneNumber == '') {
            return this.setState({
                errorMessage: 'One or more fields are not completed.'
            })
        }

        await firestore()
            .collection('zamowienia')
            .add({
                name: this.state.name,
                surname: this.state.surname,
                city: this.state.city,
                street: this.state.street,
                phoneNumber: this.state.phoneNumber,
                dishes: this.state.dishes,
                price: this.state.price
            })
            .then(() => {
                console.log('Order added!');
            });

        await this.navigate();
    }

    navigate = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'ConfirmationPage',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        })
    }


        render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Complete the fields
                </Text>
                <View>
                    <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = "Name"
                               placeholderTextColor = "#9a73ef"
                               autoCapitalize = "none"
                               onChangeText={name => this.setState({name})}
                               value={this.state.name}
                    />
                    <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = "Surname"
                               placeholderTextColor = "#9a73ef"
                               autoCapitalize = "none"
                               onChangeText={surname => this.setState({surname})}
                               value={this.state.surname}
                    />
                    <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = "City"
                               placeholderTextColor = "#9a73ef"
                               autoCapitalize = "none"
                               onChangeText={city => this.setState({city})}
                               value={this.state.city}
                    />
                    <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = "Street"
                               placeholderTextColor = "#9a73ef"
                               autoCapitalize = "none"
                               onChangeText={street => this.setState({street})}
                               value={this.state.street}
                    />
                    <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = "Phone Number"
                               placeholderTextColor = "#9a73ef"
                               autoCapitalize = "none"
                               onChangeText={phoneNumber => this.setState({phoneNumber})}
                               value={this.state.phoneNumber}
                    />
                </View>
                <Text style={styles.errorMessage}>
                    {this.state.errorMessage}
                </Text>
                <TouchableOpacity style={styles.submitButton} onPress={ () => this.sendOrder()}>
                    <Text style={styles.text}>
                        Send Order
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default OrderPage;

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f5f5dc',
        alignItems: 'center'
    },
    input: {
        marginTop: 25,
        height: 45,
        borderColor: '#7a42f4',
        backgroundColor:'#f0ffff',
        borderWidth: 1,
        borderRadius: 15,
        width: 300
    },
    header: {
        marginTop: 20,
        color: '#6A5ACD',
        fontWeight: 'bold',
        fontSize: 20
    },
    submitButton: {
        marginTop: 40,
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
    text: {
        color: '#6A5ACD',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    errorMessage: {
        textAlign: 'center',
        color: '#7a42f4',
        marginTop: 25
    }
}
