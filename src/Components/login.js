import React, { Component } from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import styles from "./style";
import { Keyboard, AsyncStorage, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native';
import Home from './App1';
import { Button } from 'react-native-elements';

const data = {
    username: "",
    password: ""
}

class LoginScreen extends Component {
    state = {
        username: '',
        password: '',
        loading: false
    }

    onLoginPress() {

        const { username, password } = this.state;

        if (username.length > 0 && password.length > 0) {

            const User = {
                password: password
            }

            const url = `https://turfpadwebservices.azurewebsites.net/user/${username}`;
            this.setState({ loading: true });

            fetch(url, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(User)

            }
            )
                .then(res => res.json())
                .then(res => {
                    if (res.gpn === "error") {
                        AsyncStorage.clear();
                        this.setState({
                            error: res.error || null,
                            loading: false,
                            refreshing: false
                        });
                        ToastAndroid.showWithGravity(
                            'Username/Password Incorrect!',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    } else {
                        AsyncStorage.setItem('user', res.gpn).then(() => {
                            this.setState({
                                error: res.error || null,
                                loading: false,
                                refreshing: false
                            });
                            this.props.navigation.navigate('HOME');
                        })
                    }
                })
                .catch(error => {
                    this.setState({ error, loading: false });
                    console.log(error);
                });

        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {
                        (this.state.loading) ?
                            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", paddingTop: 40 }}><ActivityIndicator animating size="small" /></View> : <View style={styles.loginScreenContainer}>
                                <View style={styles.loginFormView}>
                                    <Text style={styles.logoText}>turf-Pad</Text>
                                    <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} value={this.state.username} onChangeText={text => this.setState({ username: text })} />
                                    <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({ password: text })} />
                                    <Button
                                        buttonStyle={styles.loginButton}
                                        onPress={(props) => this.onLoginPress(props)}
                                        title="Login"
                                    />
                                </View>
                            </View>}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        AsyncStorage.getItem('user').then((value) => {
            if (value != null) {
                this.setState({
                    loading: false
                });
                this.props.navigation.navigate('HOME');
            } else {
                this.setState({
                    loading: false
                })
            }
        })
    }

    componentWillUnmount() {
    }

}
const AppNavigator = createStackNavigator({
    LOGIN: LoginScreen,
    HOME: Home
}, {
    initialRouteName: 'LOGIN',
    headerMode: "none"
});

export default createAppContainer(AppNavigator);
