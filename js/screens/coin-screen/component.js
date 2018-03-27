import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, Image, } from 'react-native';
import styles from './style.js';
import LoadingScreen from './components/loading'

const AppHeading = ( { text } ) => <Text style={ styles.appHeading }>{ text.toUpperCase() }</Text>;

const CoinImage = ( { name } ) => <Image
	source={ { uri: `https://coincodex.com/en/resources/images/admin/coins/${ name.toLowerCase().replace( ' ', '-' ) }.png:resizebox?56x56`, } }
	style={ styles.coinImage }
/>;

const CoinSymbol = ( { children } ) => <Text style={ styles.coinSymbol }>{ children }</Text>;
const CoinName = ( { children } ) => <Text style={ styles.coinName }>{ children }</Text>;
const CoinPrice = ( { children } ) => <Text style={ styles.coinPrice }>{ children } $</Text>;
const CoinPercentChange24H = ( { children } ) => <View style={ styles.flexRow } ><Text style={ styles.boldText }>24h: </Text><Text style={ styles.coinPercentChange24H }>{ children } %</Text></View>;

const CoinPriceItem = ( { symbol, name, price_usd, percent_change_24h, } ) => <View style={ styles.coinPriceItem }>
	<View style={ { flex: 1, } }>
		<CoinImage name={ name } />
	</View>
	<View style={ [ styles.flexRow, { flex: 4, }, ] }>
		<CoinSymbol>{ symbol }</CoinSymbol>
		<Text> | </Text>
		<CoinName>{ name }</CoinName>
	</View>
	<View style={ [ styles.flexRow, { flex: 6, justifyContent: 'flex-end', }, ] }>
		<CoinPrice>{ price_usd }</CoinPrice>
		<CoinPercentChange24H>{ percent_change_24h }</CoinPercentChange24H>
	</View>
</View>;

const Coins = ( { coinData, refresh, refreshing, loadMore, } ) => <View style={styles.container}>
	<FlatList
		ListHeaderComponent={ <AppHeading text="Coin Prices" />}
		ListFooterComponent={ <LoadingScreen /> }
		refreshing={ refreshing }
		onRefresh={ refresh }
		onEndReached={ loadMore }
		onEndReachedThreshold={ 5 }
		data={ coinData }
		renderItem={ ( { item } ) => <CoinPriceItem { ...item } /> }
		keyExtractor={ item => item.id }
	/>
</View>;

export default Coins;
