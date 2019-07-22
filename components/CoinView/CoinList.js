import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, Picker, Alert } from 'react-native';
import ApiClient from '../CoinMarketCap/ApiClient';
import CoinItem from './CoinItem';

class CoinList extends Component {
    constructor(props) {
        super(props);

        this.apiClient = new ApiClient();

        this.coins = [];
        this.state = {
            loading: false,
            error: null,
            coins: [],
            filter: "Default",
            lastUpdate: new Date().getTime(),
        };
    }

    componentDidMount() {

        this.fetchCoins();

        this.interval = setInterval(() => {
            this.fetchCoins();
        }, 180000);
    }

    // Method: fetchCoins
    // Purpose: Use the API client object to fetch coin data
    // Side effects: Updates state object and state properties
    // Errors: Creates an alert pop to let the user know there was an issue
    fetchCoins() {
        this.setState({
            loading: true,
        });
        try {
            this.apiClient.getCryptoData().then(response => {
                this.coins = response;

                this.setState({
                    loading: false,
                    coins: response,
                    lastUpdate: new Date().getTime(),
                });
            });
        } catch (error) {
            this.setState({
                loading: false,
                error: 'Something went wrong',
            });

            this.createAlert(
                'Error fetching coins',
                `Error Message: ${error}`,
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            );
        }

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // Method: createAlert
    // Purpose: Generic method to abstract creating an alert out of the other methods
    //          to cut back on repetitive code.
    createAlert(title, message, buttons) {
        Alert.alert(
            title,
            message,
            [
                ...buttons
            ]
        );
    }

    // Method: _onRefresh
    // Purpose: This is a method to handle when the FlatList is refreshed
    //          by pulling down on the list in the app.
    // Side effects: Calls fetchCoins which will modify the state property.
    _onRefresh() {
        let timeDif = new Date().getTime() - this.state.lastUpdate;

        if (timeDif >= 60000) {
            this.fetchCoins();
        } else {
            this.createAlert(
                'Not enough time between updates',
                `Crypto data only updates every 1 minute so please wait atleast ${60 - Math.round(timeDif / 1000)} seconds before refreshing.`,
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            );
        }

    }

    _renderItem = ({ item }) => (
        <CoinItem
            coinData={item}
        />
    );

    _keyExtractor = (item) => item.id.toString();

    // Method: filterSearch
    // Purpose: Allows filtering based on text box input from the user
    // Side effects: Updates the state object and it's properties
    filterSearch = text => {
        const newData = this.coins.filter(item => {
            const itemData = `${item.name.toUpperCase()} 
                            ${item.symbol.toUpperCase()}`;

            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({ coins: newData });
    }

    // Method: filterCategory
    // Purpose: Allows filtering based on category selection from drop down menu
    // Side effects: Updates the state object and it's properties
    filterCategory = (value, index) => {
        const newData = this.coins.sort((a, b) => {
            switch (value) {
                case "price-des":
                    return a.quote.USD.price - b.quote.USD.price;
                case "price-asc":
                    return b.quote.USD.price - a.quote.USD.price;
                case "market-des":
                    return a.quote.USD.market_cap - b.quote.USD.market_cap;
                case "market-asc":
                    return b.quote.USD.market_cap - a.quote.USD.market_cap;
                default:
                    return a.cmc_rank - b.cmc_rank;
            }
        })

        this.setState({
            filter: value,
            coins: newData,
        });
    }

    // Renders the header of the flat list to show the search box and category selector
    renderHeader = () => {
        return (
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    onChangeText={(text) => this.filterSearch(text)}
                    style={{
                        borderRadius: 4,
                        borderWidth: 0.75,
                        borderColor: '#d6d7da',
                        flex: 1,
                        width: "60%",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}
                />
                <Picker
                    selectedValue={this.state.filter}
                    style={{
                        width: "30%",
                        flex: 1,
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.filterCategory(itemValue, itemIndex)
                    }>
                    <Picker.Item label="Default" value="Default" />
                    <Picker.Item label="Price ASC" value="price-asc" />
                    <Picker.Item label="Price DES" value="price-des" />
                    <Picker.Item label="Market Cap ASC" value="market-asc" />
                    <Picker.Item label="Market Cap DES" value="market-des" />
                </Picker>
            </View>
        );
    };

    render() {
        let returnAble = <Text>...Fetching Coin Data...</Text>;
        if (!this.state.loading) {
            returnAble =
                <View style={styles.container}>
                    <FlatList
                        data={this.state.coins}
                        extraData={this.state}
                        onRefresh={() => this._onRefresh()}
                        refreshing={this.state.loading}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ListHeaderComponent={this.renderHeader}
                    />
                </View>
        }
        return returnAble;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        marginTop: "2%",
    }
})

export default CoinList;