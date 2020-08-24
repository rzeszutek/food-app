import React, {Component, useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import * as firebase from 'firebase';

export class SideMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logged: false
        };

        firebase.auth().onAuthStateChanged( user => {
           if ( user ) {
               this.setState({logged: true})
           }
           else {
               this.setState({logged: false})
           }
        });
    }

    componentWillUnmount(): void {
        this.setState({logged: false})
    }

    goToLoginPage = () => {
        Navigation.mergeOptions('SideMenu', {
            sideMenu: {
                left: {
                    visible: false,
                },
            },
        });
        Navigation.push('MAIN_STACK', {
            component: {
                name: 'LoginPage',
                options: {
                    topBar: {
                        title: {
                            text: 'Login Page',
                        },
                    },
                },
            },
        }).then();
    };

    goToSignUpPage = () => {
        Navigation.mergeOptions('SideMenu', {
            sideMenu: {
                left: {
                    visible: true,
                },
            },
        });
        Navigation.push('MAIN_STACK', {
            component: {
                name: 'SignUpPage',
                options: {
                    topBar: {
                        title: {
                            text: 'Sign Up Page',
                        },
                    },
                },
            },
        }).then();
    };

    goToRestaurantsPage = () => {
        Navigation.mergeOptions('SideMenu', {
            sideMenu: {
                left: {
                    visible: true,
                },
            },
        });
        Navigation.push('MAIN_STACK', {
            component: {
                name: 'RestaurantsPage',
                options: {
                    topBar: {
                        title: {
                            text: 'Restaurants Page',
                        },
                    },
                },
            },
        }).then();
    };

    goToFavourites = () => {
        Navigation.mergeOptions('SideMenu', {
            sideMenu: {
                left: {
                    visible: true,
                },
            },
        });
        Navigation.push('MAIN_STACK', {
            component: {
                name: 'Favourites',
                options: {
                    topBar: {
                        title: {
                            text: 'Favourites',
                        },
                    },
                },
            },
        }).then();
    };

    goToCredits = () => {
        Navigation.mergeOptions('SideMenu', {
            sideMenu: {
                left: {
                    visible: true,
                },
            },
        });
        Navigation.push('MAIN_STACK', {
            component: {
                name: 'Credits',
                options: {
                    topBar: {
                        title: {
                            text: 'Credits',
                        },
                    },
                },
            },
        }).then();
    };

    logout = () => {
        firebase.auth().signOut().then();

        Navigation.push('MAIN_STACK', {
            component: {
                name: 'StartScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        }).then()
    };

    render() {
        if (this.state.logged == false) {
            return (
                <View style={styles.container}>
                    <Image style={{marginTop: 30}}
                           source={require('../../assets/icons/user-icon.png')}
                    />
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => this.goToLoginPage()}>
                        <Text style={styles.textStyle}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => this.goToSignUpPage()}>
                        <Text style={styles.textStyle}>Sign up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => this.goToCredits()}>
                        <Text style={styles.textStyle}>Credits</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Image style={{marginTop: 30}}
                           source={require('../../assets/icons/user-icon.png')}
                    />
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => this.goToSignUpPage()}>
                        <Text style={styles.textStyle}>Sign up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => this.goToRestaurantsPage()}>
                        <Text style={styles.textStyle}>Restaurants</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => this.goToFavourites()}>
                        <Text style={styles.textStyle}>Favourites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => this.goToCredits()}>
                        <Text style={styles.textStyle}>Credits</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => this.logout()}>
                        <Text style={styles.textStyle}>Log out</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

export default SideMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8DC'
    },
    buttons: {
        marginTop:30,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#f0ffff',
        borderRadius:15,
        borderWidth: 2,
        borderColor: 'gray',
        width: 250,
        height: 45
    },
    textStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 13
    }
});
