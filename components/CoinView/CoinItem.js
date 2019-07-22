import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default class CoinItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cmcId: props.coinData.id,
            name: props.coinData.name,
            symbol: props.coinData.symbol,
            cmcRank: props.coinData.cmc_rank,
            circSupply: props.coinData.circulating_supply,
            totalSupply: props.coinData.total_supply,
            maxSupply: props.coinData.max_supply,
            quote: props.coinData.quote,
        }
    }

    render() {
        return (
            <View style={styles.bigContainer}>
                <View style={styles.smallColumn}>
                    <Text style={{fontWeight: "bold", fontSize: 15}}>{this.state.symbol} - {this.state.name}</Text>
                </View>
                <View style={styles.bigColumn}>
                    <View style={styles.row}>
                        <View>
                            <Text>Price: </Text>
                            <Text>${Math.round(this.state.quote.USD.price * 1000) / 1000}</Text>
                        </View>
                        <View>
                            <Text>24h Change: </Text>
                            <Text style={
                                this.state.quote.USD.percent_change_24h > 0 ?
                                    styles.positiveChange : 
                                    styles.negativeChange
                            }>
                                {this.state.quote.USD.percent_change_24h}
                            </Text>
                        </View>
                        <View>
                            <Text>7d Change: </Text>
                            <Text style={
                                this.state.quote.USD.percent_change_7d > 0 ?
                                    styles.positiveChange : 
                                    styles.negativeChange
                            }>
                                {this.state.quote.USD.percent_change_7d}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text>Max Supply: </Text>
                            <Text>{this.state.maxSupply ? this.state.maxSupply : "N/A"}</Text>
                        </View>
                        <View>
                            <Text>Circulating Supply: </Text>
                            <Text>{this.state.circSupply}</Text>
                        </View>
                        <View>
                            <Text>Market Cap: </Text>
                            <Text>{Math.trunc(this.state.quote.USD.market_cap)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bigContainer: {
        padding: 10,
        width: "90%",
        marginLeft: "5%",
        marginBottom: "2%",
        borderRadius: 4,
        borderWidth: 0.75,
        borderColor: '#d6d7da',
        flex: 1,
    },
    smallColumn: {
        flex: 1,
    },
    bigColumn: {
        flex: 3,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    positiveChange: {
        color: "#9ACD32",
    },
    negativeChange: {
        color: "#B22222",
    },
})