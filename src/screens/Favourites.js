import React, { Component } from 'react';
import {View, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';

export class Favourites extends Component{

    constructor() {
        super();

        this.state = {
            isAnonymous: true,
            favourites: [],
            email: ''
        };
    }

    async componentDidMount(): void {
        let user = await firebase.auth().currentUser;

        await this.setState({
            isAnonymous: user.isAnonymous
        })

        if(this.state.isAnonymous === false ) {

            await firestore()
                .collection('klienci')
                .doc(user.email)
                .get()
                .then( documentSnapshot => {
                    let favourites_list = documentSnapshot.data().favourites
                    this.setState({
                        favourites: this.state.favourites.concat(favourites_list)
                    })
                })
        }
    }

    componentWillUnmount(): void {
        this.setState({isAnonymous: true})
    }

    renderFavourites = () => {
        return this.state.favourites.slice(1).map( element => {
            return (
                <View style={styles.favourites} key={element}>
                    <Text style={styles.favouritesText}>
                        {element}
                    </Text>
                    <TouchableOpacity onPress={ () => this.removeItem(element)}>
                        <Image
                            style={styles.icon}
                            source={require('../../assets/icons/minus-icon.png')}
                        />
                    </TouchableOpacity>
                </View>
            )
        })
    }

    removeItem = async (element) => {
        const index = this.state.favourites.indexOf(element);

        if (index > -1) {
            await this.state.favourites.splice(index, 1)
        }

        let user = await firebase.auth().currentUser;

        await firestore()
            .collection('klienci')
            .doc(user.email)
            .update({
                favourites: this.state.favourites
            })

        this.forceUpdate();
    }

    render() {
       if (this.state.isAnonymous === true) {
           return (
               <View style={styles.container}>
                   <Image
                       style={{top: 30}}
                       source={require('../../assets/icons/favourites-icon.png')}
                   />
                   <Text style={styles.text}>
                       You need to sign up {"\n"}to have your own Favourites List.
                   </Text>
               </View>
           )
       }
       else if (this.state.isAnonymous === false){
           return(
               <View style={styles.container}>
                   <View style={styles.header}>
                       <Image
                           style={{top: 30}}
                           source={require('../../assets/icons/favourites-icon.png')}
                       />
                       <Text style={styles.text}> List of your favourite choices{'\n'}from all restaurants </Text>
                   </View>
                   <ScrollView style={styles.scrollView}>
                       {this.renderFavourites()}
                   </ScrollView>
               </View>
           );
       }
    }
}

export default Favourites;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5dc',
    },
    text: {
        color: '#7a42f4',
        fontSize: 20,
        marginTop: 50,
        textAlign: 'center'
    },
    header: {
        alignItems: 'center',
    },
    scrollView: {
        marginTop: 30,
        width: 300
    },
    favourites: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#EEE8AA',
        borderColor: '#7a42f4',
        borderWidth: 2,
        borderRadius: 15
    },
    favouritesText: {
        color: '#7a42f4',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20
    },
    icon: {
        height: 25,
        width: 25,
    }
};
