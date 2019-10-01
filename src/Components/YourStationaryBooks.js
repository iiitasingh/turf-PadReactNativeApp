import React from "react";
import { View, Text, FlatList, ActivityIndicator, AsyncStorage } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import MyHeader from "./MyHeader";


class YourBookings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            search: '',
            refreshing: false,
            gpn: ''
        };
    }


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round onChangeText={this.updateSearch} value={this.state.search} />;
    };

    updateSearch = (search) => {
        this.setState({ search: search });
    }

    makeRemoteRequest = () => {
        const url = `https://turfpadwebservices.azurewebsites.net/stationary/all/${this.state.gpn}`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res,
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false });
            });
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.makeRemoteRequest();
        })
    }

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="small" />
            </View>
        );
    };

    componentDidMount() {
        AsyncStorage.getItem('user').then((value) => {
            this.setState({ gpn: value }, () => {
                this.makeRemoteRequest();
            });
        })



    }

    render() {
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="Stationary Bookings" />
                {
                    (this.state.loading) ?
                        <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}><ActivityIndicator animating size="small" /></View> : <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                                <ListItem
                                    roundAvatar
                                    leftIcon={{ name: 'av-timer' }}
                                    title={item.type}
                                    subtitle={item.time}
                                    containerStyle={{ borderBottomWidth: 0 }}
                                    badge={{ value: <Text>{item.status}</Text>, textStyle: { color: 'white', fontSize: 14 }, containerStyle: { marginTop: -20 }, status: (item.status === 'Pending') ? "warning" : "primary", badgeStyle: { padding: 10 } }}

                                />
                            )}
                            keyExtractor={item => item._id}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListFooterComponent={this.renderFooter}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                        />}
            </View >
        );
    }
}

export default YourBookings;

