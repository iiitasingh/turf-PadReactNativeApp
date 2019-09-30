import React, { useState } from "react";
import { View, ScrollView, ToastAndroid, ActivityIndicator, Alert, AsyncStorage } from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
import { Button } from 'react-native-elements';
import MyHeader from "./MyHeader";
import styles from "./style";

let data = [{
    value: 'Book',
}, {
    value: 'Pen',
}, {
    value: 'Sticky',
}, {
    value: 'Tape',
}, {
    value: 'Glue',
}];

var gpn;
AsyncStorage.getItem('user').then((value) => {
    gpn = value;
})


class StationaryBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            error: null,
            loading: false
        }
    }


    onSubmit = (props) => {
        if (this.state.type.length >= 1) {
            const Postdata = {
                gpn: gpn,
                type: this.state.type,
                status: 'Pending'
            };
            const url = `https://turf-pad.herokuapp.com/stationary`;
            this.setState({ loading: true });
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Postdata)
            })
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        this.setState({
                            error: res.error || null,
                            loading: false
                        });
                        Alert.alert(
                            'Stationary Booked Successfully',
                            '',
                            [
                                { text: 'OK', onPress: () => this.props.navigation.goBack() },
                            ],
                            { cancelable: false },
                        );
                        ;
                    }
                })
                .catch(error => {
                    this.setState({ error, loading: false });
                    console.log(error);
                });
        } else {
            ToastAndroid.showWithGravity(
                'Select a Stationary',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }
    render() {
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="Stationary" />
                {(this.state.loading) ?
                    <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}><ActivityIndicator animating size="small" /></View> : <ScrollView style={styles.scrollPage}>
                        <Dropdown
                            label='Select Stationary'
                            data={data}
                            onChangeText={(value) => { this.setState({ type: value }) }}
                        />
                        <Button buttonStyle={styles.TurfButton}
                            onPress={(props) => this.onSubmit(props)}
                            title="Add Booking" />
                    </ScrollView>}
            </View>
        );
    }
};

export default StationaryBooking;