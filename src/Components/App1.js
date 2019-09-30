import React from 'react';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { AsyncStorage, SafeAreaView, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Footer, Item, Input, Content, Icon, Right, Text } from 'native-base';
import HomeScreen from "./Home";
import YourTurfBookings from "./YourTurfBookings";
import YourStationaryBookings from "./YourStationaryBooks";


const CustumDrawerComponent = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                <Image source={require('../../assets/images/abstract_icon.png')} style={{ height: 130, width: 110 }} />
            </View>
            <ScrollView>
                <DrawerNavigatorItems {...props} />
            </ScrollView>
            <Footer style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => {
                    AsyncStorage.clear().then(() => {
                        props.navigation.navigate('LOGIN')
                    })
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 10 }}>Logout</Text>
                        <Icon name='log-out' style={{ marginRight: 20 }} />
                    </View>
                </TouchableOpacity>
            </Footer>
        </SafeAreaView>
    )
};


const AppNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            drawerLabel: 'Home',
        }
    },
    TurfBookings: {
        screen: YourTurfBookings
    },
    StationaryBookings: {
        screen: YourStationaryBookings
    }
}, {
    contentComponent: CustumDrawerComponent
});

export default createAppContainer(AppNavigator);