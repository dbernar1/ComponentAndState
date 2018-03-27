import React, { Component } from 'react';
import LoadingScreen from './components/loading'
import Coins from './component.js'

const coinAPIBaseURL = 'https://api.coinmarketcap.com';

const fetchCoinData = () => fetch( `${coinAPIBaseURL}/v1/ticker/?limit=10` )
.then( response => response.json() )
.catch( error => console.error(error) );

class CoinScreenContainer extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			initialLoading: true,
			refreshing: false,
		};
	}

	refreshCoinData() {
		this.setState( { refreshing: true, }, () => {
			setTimeout( () => {
				fetchCoinData()
				.then( coinData => this.setState( {
					refreshing: false,
					coinData,
				} ) );
			}, 500 );
		} );
	}

	componentDidMount() {
		fetchCoinData()
		.then( coinData => this.setState( {
			initialLoading: false,
			coinData,
		} ) );
	}

	render() {
		const { initialLoading, coinData, refreshing, } = this.state;

		if ( initialLoading ) {
			return <LoadingScreen />;
		}

		return <Coins
			coinData={ coinData }
			refresh={ () => this.refreshCoinData() }
			refreshing={ refreshing }
		/>;
	}
}

export default CoinScreenContainer;
