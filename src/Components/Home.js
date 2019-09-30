import React from "react";
import { View, Text, ScrollView, Image, AsyncStorage } from "react-native";
import MyHeader from "./MyHeader";
import BookCard from './Card';
import TurfPage from './turfBook'
import StationaryPage from './StationaryBooking'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const HomeScreen = props => {
    const handleClik = () => {
        props.navigation.navigate('TurfPage');
    };
    const handleClik1 = () => {
        props.navigation.navigate('StationaryPage');
    };
    return (
        <View>
            <MyHeader navigation={props.navigation} title="Home" />
            <ScrollView>
                <BookCard handlePress={handleClik} title="Turf" subTitle="CZ-L10" style={{ elevation: 4 }} image={true} />
                <BookCard handlePress={handleClik1} title="Stationary" subTitle="CZ-L6" style={{ marginTop: 15, marginBottom: 100, elevation: 4 }} image={false} />
            </ScrollView>
        </View>
    );
};



const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    StationaryPage: StationaryPage,
    TurfPage: TurfPage
}, {
    headerMode: "none"
});

export default createAppContainer(AppNavigator);