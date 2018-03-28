import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, View, Text, FlatList, Image, } from 'react-native';
import styles from './style.js';
import LoadingScreen from './components/loading'
import { connecty } from '../../redux';

const Coins = connecty(
	[ 'coinData', 'refreshing', ],
	[ 'refreshCoinData', 'loadMore', ]
)( ( {
	coinData, refreshCoinData, refreshing, loadMore, navigation,
} ) => <View style={styles.container}>
	<FlatList
		ListFooterComponent={ <LoadingScreen /> }
		refreshing={ refreshing }
		onRefresh={ refreshCoinData }
		onEndReached={ loadMore }
		onEndReachedThreshold={ 0.7 }
		data={ coinData }
		renderItem={ ( { item } ) => <CoinPriceItem navigation={ navigation } { ...item } /> }
		keyExtractor={ item => item.id }
	/>
</View> );

export default Coins;









// Details...
export const CoinImage = ( { name } ) => <Image
	source={ { uri: `https://coincodex.com/en/resources/images/admin/coins/${ name.toLowerCase().replace( ' ', '-' ) }.png:resizebox?56x56`, } }
	style={ styles.coinImage }
/>;

const CoinSymbol = ( { children } ) => <Text style={ styles.coinSymbol }>{ children }</Text>;
const CoinName = ( { children } ) => <Text style={ styles.coinName }>{ children }</Text>;
const CoinPrice = ( { children } ) => <Text style={ styles.coinPrice }>{ children } $</Text>;
const CoinPercentChange24H = ( { children } ) => <View style={ styles.flexRow } ><Text style={ styles.boldText }>24h: </Text><Text style={ styles.coinPercentChange24H }>{ children } %</Text></View>;

const CoinPriceItem = ( { navigation, symbol, name, price_usd, percent_change_24h, } ) => <View style={ styles.coinPriceItem }>
	<TouchableOpacity onPress={ () => {
		navigation.navigate( 'CoinDetail', {
			symbol,
			name,
		} );
	} }>
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
	</TouchableOpacity>
</View>;
