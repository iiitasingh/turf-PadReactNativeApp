import React from "react";
import { View, ScrollView, ActivityIndicator, ToastAndroid, Alert, AsyncStorage } from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Dropdown } from 'react-native-material-dropdown';
import { Button } from 'react-native-elements';
import moment, { calendarFormat } from 'moment';
import MyHeader from "./MyHeader";
import styles from "./style";


let timeSlots = [
    { value: '8am-9am' },
    { value: '9am-10am' },
    { value: '10am-11am' },
    { value: '11am-12pm' },
    { value: '12pm-1pm' },
    { value: '1pm-2pm' },
    { value: '2pm-3pm' },
    { value: '3pm-4pm' },
    { value: '4pm-5pm' },
    { value: '5pm-6pm' },
    { value: '6pm-7pm' }
];

let Status = [
    { value: 'Confirmed' },
    { value: 'Tentative' }
];

var gpn;
AsyncStorage.getItem('user').then((value) => {
    gpn = value;
})


class TurfBooking extends React.Component {

    state = {
        date: moment(new Date()).format('DD-MM-YYYY'),
        isVisible: false,
        loading: false,
        slotData: [],
        result: [],
        selectedSlot: '',
        status: 'Confirmed',
        search: '',
        refreshing: false,
    }

    showPicker = () => {
        this.setState({ isVisible: true });
    };

    handlePicker = (date) => {
        this.setState({
            isVisible: false,
            date: moment(date).format('DD-MM-YYYY')
        });

        const url = `https://turf-pad.herokuapp.com/turfdata/${this.state.date}`;
        this.setState({ loading: true });

        fetch(url, { method: 'get' })
            .then(res => res.json())
            .then(res => {
                const comparer = (xArray) => {
                    return (current) => {
                        return xArray.filter((other) => {
                            return other.value == current.value
                        }).length == 0;
                    }
                }
                var filteredSlot = timeSlots.filter(comparer(res));
                var onlyInB = res.filter(comparer(timeSlots));
                this.setState({ result: filteredSlot.concat(onlyInB) }, () => {

                });
                this.setState({
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
                console.log(error);
            });

    };

    hidePicker = (date) => {
        this.setState({
            isVisible: false,
        });
    };

    onSubmit = (props) => {
        if (this.state.selectedSlot.length >= 1) {
            const Postdata = {
                gpn: gpn,
                date: this.state.date,
                value: this.state.selectedSlot,
                status: this.state.status
            };
            const url = `https://turf-pad.herokuapp.com/turfdata`;
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
                            loading: false,
                            refreshing: false
                        });
                        Alert.alert(
                            'Slot Booked Successfully',
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
                'Select a Slot',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }

    componentDidMount() {
        const url = `https://turf-pad.herokuapp.com/turfdata/${this.state.date}`;
        this.setState({ loading: true });

        fetch(url, { method: 'get' })
            .then(res => res.json())
            .then(res => {
                const comparer = (xArray) => {
                    return (current) => {
                        return xArray.filter((other) => {
                            return other.value == current.value
                        }).length == 0;
                    }
                }
                var filteredSlot = timeSlots.filter(comparer(res));
                var onlyInB = res.filter(comparer(timeSlots));
                this.setState({ result: filteredSlot.concat(onlyInB) }, () => {

                });
                this.setState({
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
                console.log(error);
            });
    };

    render() {
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="Turf" />
                {
                    (this.state.loading) ?
                        <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}><ActivityIndicator animating size="small" /></View> : <ScrollView style={styles.scrollPage}>
                            <View>
                                {/* <TextField
                                    label='Select Date'
                                    value={this.state.date}
                                    onChangeText={(phone) => this.setState({ date: phone })}
                                    onFocus={() => this.showPicker()}

                                /> */}
                                <Button buttonStyle={styles.TurfButton}
                                    onPress={() => this.showPicker()}
                                    title={this.state.date} />

                                <DateTimePicker
                                    isVisible={this.state.isVisible}
                                    onConfirm={(date) => this.handlePicker(date)}
                                    onCancel={(date) => this.hidePicker(date)}
                                    mode={'date'}
                                    minimumDate={new Date()}
                                />
                            </View>
                            <Dropdown
                                label='Select Slot'
                                data={this.state.result}
                                onChangeText={(value) => this.setState({ selectedSlot: value })}
                            />
                            <Dropdown
                                label='Status'
                                data={Status}
                                value={this.state.status}
                                onChangeText={(value) => this.setState({ status: value })}
                            />
                            <Button buttonStyle={styles.TurfButton}
                                onPress={(props) => this.onSubmit(props)}
                                title="Add Booking" />
                        </ScrollView>
                }
            </View >
        );
    }


};

export default TurfBooking;