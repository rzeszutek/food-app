/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import StartScreen from './src/screens/StartScreen';
import LoginPage from './src/screens/LoginPage';
import SignUpPage from './src/screens/SignUpPage';
import PasswordRecovery from './src/screens/PasswordRecovery';
import SideMenu from './src/components/SideMenu';
import Favourites from './src/screens/Favourites';
import RestaurantsPage from './src/screens/RestaurantsPage';
import DishesPage from './src/screens/DishesPage';
import Credits from './src/screens/Credits';
import BuyingPage from './src/screens/BuyingPage';
import OrderPage from './src/screens/OrderPage';
import ConfirmationPage from './src/screens/ConfirmationPage';
import * as firebase from 'firebase';

Navigation.registerComponent('StartScreen', () => StartScreen);
Navigation.registerComponent('LoginPage', () => LoginPage);
Navigation.registerComponent('SignUpPage', () => SignUpPage);
Navigation.registerComponent('PasswordRecovery', () => PasswordRecovery);
Navigation.registerComponent('SideMenu', () => SideMenu);
Navigation.registerComponent('Favourites', () => Favourites);
Navigation.registerComponent('RestaurantsPage', () => RestaurantsPage);
Navigation.registerComponent('DishesPage', () => DishesPage);
Navigation.registerComponent('Credits', () => Credits);
Navigation.registerComponent('BuyingPage', () => BuyingPage);
Navigation.registerComponent('OrderPage', () => OrderPage);
Navigation.registerComponent('ConfirmationPage', () => ConfirmationPage);

export const firebaseConfig = {
    apiKey: 'AIzaSyCsPfcHUDGqn3XU5d0Q9sfkDisleOsmrWs',
    authDomain: 'foodapp-48f76.firebaseapp.com',
    databaseURL: 'https://foodapp-48f76.firebaseio.com',
    projectId: 'foodapp-48f76',
    storageBucket: 'foodapp-48f76.appspot.com',
    messagingSenderId: '284019703918',
    appId: '1:284019703918:web:489dd481cd75359053667f',
    measurementId: 'G-RXX3LEX2E6',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            sideMenu: {
                left: {
                    component: {
                        name: 'SideMenu',
                    },
                },
                center: {
                    stack: {
                        id: 'MAIN_STACK',
                        children: [
                            {
                                component: {
                                    name: 'StartScreen',
                                    options: {
                                        topBar: {
                                            visible: false
                                        }
                                    }
                                }
                            }
                        ]
                    }
                },
            },
        }
    }).then();
});

Navigation.events().registerNavigationButtonPressedListener(() => {
    Navigation.mergeOptions('SideMenu', {
        sideMenu: {
            left: {
                visible: true,
            },
        },
    });
});




