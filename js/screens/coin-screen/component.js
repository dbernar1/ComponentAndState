import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, Image, } from 'react-native';
import styles from './style.js';

const AppHeading = ( { text } ) => <Text style={ styles.appHeading }>{ text.toUpperCase() }</Text>;

const CoinImage = ( { symbol } ) => <Image
	source={ { uri: cryptoImages[ symbol ], } }
	style={ styles.coinImage }
/>;

const CoinSymbol = ( { children } ) => <Text style={ styles.coinSymbol }>{ children }</Text>;
const CoinName = ( { children } ) => <Text style={ styles.coinName }>{ children }</Text>;
const CoinPrice = ( { children } ) => <Text style={ styles.coinPrice }>{ children } $</Text>;
const CoinPercentChange24H = ( { children } ) => <View style={ styles.flexRow } ><Text style={ styles.boldText }>24h: </Text><Text style={ styles.coinPercentChange24H }>{ children } %</Text></View>;

const CoinPriceItem = ( { symbol, name, price_usd, percent_change_24h, } ) => <View style={ styles.coinPriceItem }>
	<View style={ { flex: 1, } }>
		<CoinImage symbol={ symbol } />
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

const Coins = ( { coinData, refresh, refreshing, } ) => <View style={styles.container}>
	<FlatList
		ListHeaderComponent={ <AppHeading text="Coin Prices" />}
		refreshing={ refreshing }
		onRefresh={ refresh }
		data={ coinData }
		renderItem={ ( { item } ) => <CoinPriceItem { ...item } /> }
		keyExtractor={ item => item.id }
	/>
</View>;

export default Coins;

const cryptoImages = {
	BTC: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609483/bitcoin_eqld4v.png',
	ETH: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609485/ethereum_nw0chu.png',
	XRP: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/ripple_p0xeut.png',
	BCH: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609483/bitcoin-cash_cvt54z.png',
	LTC: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609485/litecoin_q8e17h.png',
	DASH: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609484/dash_oltvqi.png',
	XEM: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/nem_imprip.png',
	BCC: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/bitconnect_oj1bo5.png',
	XMR: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/monero_wzk3ur.png',
	NEO: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/neo_fvoo6c.png',
	ADA: 'https://coincodex.com/en/resources/images/admin/coins/cardano.png:resizebox?60x60',
	MIOTA: 'https://coincodex.com/en/resources/images/admin/coins/iota.png:resizebox?60x60',
	XLM: 'https://coincodex.com/en/resources/images/admin/coins/stellar.png:resizebox?60x60',
};
