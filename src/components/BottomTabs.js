import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image, ScrollView, Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export class BottomTabs extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container} horizontal = {true}>
                <TouchableOpacity onPress={() => this.props.onPress('All')}>
                    <Image style={styles.icons} source={require('../../assets/icons/food-icon.png')}>
                    </Image>
                    <Text style={styles.text}>
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onPress('Asian')}>
                    <Image style={styles.icons} source={require('../../assets/icons/asian-icon.png')}>
                    </Image>
                    <Text style={styles.text}>
                        Asian
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onPress('Italian')}>
                    <Image style={styles.icons} source={require('../../assets/icons/italian-icon.png')}>
                    </Image>
                    <Text style={styles.text}>
                        Italian
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onPress('French')}>
                    <Image style={styles.icons} source={require('../../assets/icons/french-icon.png')}>
                    </Image>
                    <Text style={styles.text}>
                        French
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onPress('Seafood')}>
                    <Image style={styles.icons} source={require('../../assets/icons/nautilus-icon.png')}>
                    </Image>
                    <Text style={styles.text}>
                        Seafood
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onPress('Spanish')}>
                    <Image style={styles.icons} source={require('../../assets/icons/spanish-icon.png')}>
                    </Image>
                    <Text style={styles.text}>
                        Spanish
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default BottomTabs;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 30,
        width: width + 300,
        justifyContent: 'space-around',
        backgroundColor: '#FFF8DC',
    },
    icons: {
        height: 45,
        width: 45,
        marginTop: 18
    },
    text: {
        color: '#7a42f4',
        textAlign: 'center'
    }
});
