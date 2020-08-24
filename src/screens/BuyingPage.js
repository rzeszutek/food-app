import React, { Component } from 'react';
import {View, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';

export class BuyingPage extends Component {

    constructor() {
        super();

        this.state = {
            dishes: [],
            price: ''
        }
    }

    async componentDidMount(): void {
        await this.setState({
            dishes: this.state.dishes.concat(this.props.dishes),
            price: this.props.price
        })
    }

    renderList = () => {
        return this.state.dishes.map( element => {
            return (
                <View style={styles.dishContainer} key={element}>
                    <Text style={styles.text}>
                        {element}
                    </Text>
                </View>
            )
        })
    }

    navigate = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'OrderPage',
                passProps: {
                    dishes: this.state.dishes,
                    price: this.state.price
                },
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
                <View>
                    <Text style={styles.header}>
                        Your dishes
                    </Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {this.renderList()}
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <Text style={styles.price}>
                        {'Cost: ' + this.state.price + '$'}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={ () => this.navigate() }>
                        <Text style={styles.text}>
                            Order Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default BuyingPage;

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f5f5dc'
    },
    header: {
        color: '#6A5ACD',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20
    },
    scrollContainer: {
        padding: 10,
        marginBottom: 40
    },
    dishContainer: {
        padding: 15,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#EEE8AA',
        borderColor: '#7a42f4',
        borderWidth: 2,
        borderRadius: 15,
    },
    text: {
        color: '#6A5ACD',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    price: {
        color: '#6A5ACD',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30
    },
    button: {
        borderColor: '#6A5ACD',
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: '#EEE8AA',
        padding: 10
    }
}

