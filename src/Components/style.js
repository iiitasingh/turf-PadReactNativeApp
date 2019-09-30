const React = require("react-native");

const { StyleSheet } = React;

export default {

    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },
    loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    fbLoginButton: {
        height: 45,
        marginTop: 10,
        backgroundColor: 'transparent',
    },
    cardAction: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#3897f1',
        color: "#fff",
        fontWeight: "bold"
    },
    bookText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5
    },
    scrollPage: {
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20
    },
    turfForm: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 5,
        marginTop: 5,
        marginBottom: 5,

    },
    dropDownPicker: {
        height: 43,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 5,
        marginTop: 5,
        marginBottom: 5,

    },
    content: {
        textAlign: 'left',
        margin: 10,
    },
    TurfButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 20
    },
    DateButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30
    },
};