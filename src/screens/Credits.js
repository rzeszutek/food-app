import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

export class Credits extends Component {

    render() {
        return (
          <View style={styles.container}>
              <View style={styles.imageContainer1}>
                  <Image
                      style={styles.icon}
                      source={require('../../assets/icons/react-native-icon.png')}
                  />
              </View>
              <View style={styles.imageContainer2}>
                  <Image
                      style={styles.icon}
                      source={require('../../assets/icons/github-icon.png')}
                  />
                  <Image
                      style={styles.icon}
                      source={require('../../assets/icons/js-icon.png')}
                  />
              </View>
              <View style={styles.container2}>
                  <Text style={styles.header}>Project creators:{'\n'}{'\n'}</Text>
                  <Text style={styles.text}>Rafał Rzeszutek {'\n'}{'\n'}Rafał Zieliński {'\n'}{'\n'}Wojciech Nowak</Text>
              </View>
          </View>
        );
    }
}

export default Credits;

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f5f5dc',
        justifyContent: 'space-around',
        padding: 30
    },
    imageContainer1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5dc',
    },
    imageContainer2: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f5f5dc',
        marginTop: 20
    },
    container2: {
        flex: 3,
        backgroundColor: '#f5f5dc',
    },
    icon: {
        height: 60,
        width: 60,

    },
    header: {
        textAlign: 'center',
        color: '#6A5ACD',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        textAlign: 'center',
        color: '#6A5ACD',
        fontSize: 18,
    }
}
