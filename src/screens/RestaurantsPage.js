import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import firestore from '@react-native-firebase/firestore';
import BottomTabs from '../components/BottomTabs';

export class RestaurantsPage extends Component {

    state = {
        restaurantsList: []
    }

    constructor() {
        super();

        firestore()
            .collection('restauracje')
            .doc('Restaurants')
            .get()
            .then( documentSnapshot => {
                let restaurants = Object.values(documentSnapshot.data())
                this.setState({
                    restaurantsList: this.state.restaurantsList.concat(restaurants) })
            });
    }

    choice = (element) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'DishesPage',
                passProps: {
                  subcollection: element
                },
                options: {
                    topBar: {
                        title: {
                            text: 'Dishes'
                        }
                    }
                }
            }
        }).then()
    };

    renderItem = () => {
        return this.state.restaurantsList.map(element => {
            return (
                <View style={styles.restaurantContainer} key = {element}>
                    <Text style={styles.restaurantName} >
                        {element}
                    </Text>
                    <TouchableOpacity
                        style={styles.arrowButton}
                        onPress={() => this.choice(element)}>
                        <Image
                            style={styles.icon}
                            source={require('../../assets/icons/choice-icon.png')}
                        />
                    </TouchableOpacity>
                </View>
            );
        });
    };

    categoryChoice = (category) => {
        switch (category) {
            case 'All':
                this.setState({restaurantsList: [] })
                firestore()
                    .collection('restauracje')
                    .doc('Restaurants')
                    .get()
                    .then( documentSnapshot => {
                        let restaurants = Object.values(documentSnapshot.data())
                        this.setState({restaurantsList: this.state.restaurantsList.concat(restaurants) })
                    });
                break;
            case 'Asian':
                this.setState({restaurantsList: [] })
                firestore()
                    .collection('restauracje')
                    .doc('Categories')
                    .get()
                    .then( documentSnapshot => {
                        let restaurants = documentSnapshot.data().Asian
                        this.setState({restaurantsList: this.state.restaurantsList.concat(restaurants) })
                    })
                break;
            case 'Italian':
                this.setState({restaurantsList: [] })
                firestore()
                    .collection('restauracje')
                    .doc('Categories')
                    .get()
                    .then( documentSnapshot => {
                        let restaurants = documentSnapshot.data().Italian
                        this.setState({restaurantsList: this.state.restaurantsList.concat(restaurants) })
                    })
                break;
            case 'French':
                this.setState({restaurantsList: [] })
                firestore()
                    .collection('restauracje')
                    .doc('Categories')
                    .get()
                    .then( documentSnapshot => {
                        let restaurants = documentSnapshot.data().French
                        this.setState({restaurantsList: this.state.restaurantsList.concat(restaurants) })
                    })
                break;
            case 'Seafood':
                this.setState({restaurantsList: [] })
                firestore()
                    .collection('restauracje')
                    .doc('Categories')
                    .get()
                    .then( documentSnapshot => {
                        let restaurants = documentSnapshot.data().Seafood
                        this.setState({restaurantsList: this.state.restaurantsList.concat(restaurants) })
                    })
                break;
            case 'Spanish':
                this.setState({restaurantsList: [] })
                firestore()
                    .collection('restauracje')
                    .doc('Categories')
                    .get()
                    .then( documentSnapshot => {
                        let restaurants = documentSnapshot.data().Spanish
                        this.setState({restaurantsList: this.state.restaurantsList.concat(restaurants) })
                    })
                break;
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <ScrollView style={styles.scrollContainer}>
                        {this.renderItem()}
                    </ScrollView>
                </View>
                <View style={styles.tabs}>
                    <BottomTabs onPress = {this.categoryChoice}></BottomTabs>
                </View>
            </View>
        );
    }
}

export default RestaurantsPage;

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f5f5dc',
        flexWrap: 'nowrap',
        alignContent: 'space-between'
    },
    restaurantContainer: {
        flex: 1,
        backgroundColor: '#EEE8AA',
        padding: 40,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        borderRadius: 15,
        borderColor: '#7a42f4',
        borderWidth: 2
    },
    scrollContainer: {
        flex: 1,
        padding: 10,
        marginBottom: 0
    },
    restaurantName: {
        color: '#6A5ACD',
        padding: 8,
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 'bold'
    },
    icon: {
        height: 35,
        width: 35
    },
    arrowButton: {
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 40,
        paddingRight: 25,
    },
    tabs: {
        borderTopColor: '#7a42f4',
        borderTopWidth: 2
    }
}
