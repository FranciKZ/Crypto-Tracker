import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CoinList from './components/CoinView/CoinList';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <CoinList></CoinList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    backgroundColor: "#fff", 
    alignItems: "center",
    width: "100%", 
  },
});
