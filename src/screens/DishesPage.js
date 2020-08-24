import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Navigation} from 'react-native-navigation';
import * as firebase from 'firebase';

export class DishesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurant: '',
            coursesList: [],
            counter: 0,
            value: '',
            addedDishes: [],
            price: 0,
            favourites: []
        };

        this.sub = props.subcollection;
    }

    async componentDidMount(): void {
        let user = firebase.auth().currentUser;

        if(user.isAnonymous == false) {
            await firestore()
                .collection('klienci')
                .doc(user.email)
                .get()
                .then( documentSnapshot => {
                    let favourites = documentSnapshot.data().favourties
                    this.setState({
                        favourites: this.state.favourites.concat(favourites)
                    })
                })
        }

        await this.setState({
            restaurant: this.props.subcollection
        })

        firestore()
            .collection('restauracje')
            .doc(this.state.restaurant)
            .get()
            .then( documentSnapshot => {
                let objects = documentSnapshot.data()
                let prices = objects.course_price
                let courses = objects.courses
                let result = courses.map( function (x, i) {
                    return [x, prices[i]]
                });
                this.setState({
                    coursesList: result
                })
            });
    }

    add = async (element1, element2) => {
        element2 = parseInt(element2)

        await this.setState({
            counter: this.state.counter + 1,
            addedDishes: this.state.addedDishes.concat(element1),
            price: this.state.price + element2
        });
    }

    subtract = async (element1, element2) => {
        if(this.state.counter > 0){
            if(this.state.addedDishes.includes(element1)){
                element2 = parseInt(element2)
                await this.setState({
                    counter: this.state.counter - 1,
                    price: this.state.price - element2
                })

                const index = this.state.addedDishes.indexOf(element1);
                if (index > -1) {
                    this.state.addedDishes.splice(index, 1);
                }
            }
        }
    }

    navigateToCart = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'BuyingPage',
                passProps: {
                  dishes: this.state.addedDishes,
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

    addToFavourites = async (element) => {
        let user = await firebase.auth().currentUser;

        if(!this.state.favourites.includes(element)) {
            this.setState({
                favourites: this.state.favourites.concat(element)
            })

            await firestore()
                .collection('klienci')
                .doc(user.email)
                .update({
                    favourites: this.state.favourites
                })
        }
    }

    renderItem = () => {
        return this.state.coursesList.map( element => {
            return (
                <View style={styles.dishContainer} key = {element}>
                    <Text style={styles.dishName}>
                        {element[0]}
                    </Text>
                    <Text style={styles.price}>
                        {element[1] + '$'}
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={ () => this.add(element[0], element[1]) }>
                            <Image
                                style={styles.icon}
                                source={require('../../assets/icons/plus-icon.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => this.subtract(element[0], element[1]) }>
                            <Image
                                style={styles.icon}
                                source={require('../../assets/icons/minus-icon.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => this.addToFavourites(element[0]) }>
                            <Image
                            style={styles.icon}
                            source={require('../../assets/icons/favourites-icon.png')}
                        />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cartContainer}>
                    <Text style={styles.counter}>
                        {this.state.counter}
                    </Text>
                    <TouchableOpacity onPress={ () => this.navigateToCart()}>
                        <Image
                            style={styles.icon}
                            source={require('../../assets/icons/cart-icon.png')}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {this.renderItem()}
                </ScrollView>
            </View>
        );
    }
}

export default DishesPage;

const styles = {
    cartContainer: {
        backgroundColor: '#f5f5dc',
        alignItems: 'center',
        marginTop: 10
    },
    cartIcon: {
        height: 35,
        width: 35,
    },
    counter: {
        color: '#6A5ACD',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    container: {
        backgroundColor: '#f5f5dc'
    },
    scrollContainer: {
        marginTop: 10,
        marginBottom: 80
    },
    dishContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EEE8AA',
        padding: 50,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderRadius: 15,
        borderColor: '#7a42f4',
        borderWidth: 2
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    dishName: {
        color: '#6A5ACD',
        position: 'absolute',
        marginTop: 20,
        fontSize: 15,
        marginLeft: 35,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    icon: {
        height: 45,
        width: 45
    },
    price: {
        position: 'absolute',
        color: '#6A5ACD',
        marginTop: 20,
        fontSize: 15,
        marginLeft: 255,
        fontWeight: 'bold'
    }
}
