import React, { Component } from 'react';
import LoadingScreen from './components/loading'
import Coins from './component.js'

const coinAPIBaseURL = 'https://api.coinmarketcap.com';
const numItemsToLoadAtATime = 20;

const fetchCoinData = ( startPosition ) => {
	const url = `${coinAPIBaseURL}/v1/ticker/?limit=${ numItemsToLoadAtATime }&start=${ startPosition }`;

	return fetch( url )
	.then( response => response.json() )
	.catch( error => console.error(error) );
};

class CoinScreenContainer extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			initialLoading: true,
			refreshing: false,
			numItemsLoadedSoFar: 0,
			fetchesAlreadyDonePreviously: [], // to avoid loading same list of coins multiple times
		};
	}

	refreshCoinData() {
		this.setState( {
			refreshing: true,
			numItemsLoadedSoFar: 0,
			fetchesAlreadyDonePreviously: [],
		}, () => {
			setTimeout( () => {
				fetchCoinData( this.state.numItemsLoadedSoFar )
				.then( coinData => this.setState( {
					refreshing: false,
					coinData,
				} ) );
			}, 500 );
		} );
	}

	componentDidMount() {
		fetchCoinData( this.state.numItemsLoadedSoFar )
		.then( coinData => this.setState( {
			initialLoading: false,
			coinData,
			numItemsLoadedSoFar: this.state.numItemsLoadedSoFar + numItemsToLoadAtATime,
		} ) );
	}

	loadMore() {
		if ( this.state.fetchesAlreadyDonePreviously.includes( this.state.numItemsLoadedSoFar ) ) {
			return
		}

		this.state.fetchesAlreadyDonePreviously.push( this.state.numItemsLoadedSoFar );

		fetchCoinData( this.state.numItemsLoadedSoFar )
		.then( coinData => this.setState( {
			coinData: this.state.coinData.concat( coinData ),
			numItemsLoadedSoFar: this.state.numItemsLoadedSoFar + numItemsToLoadAtATime,
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
			loadMore={ () => this.loadMore() }
		/>;
	}
}

export default CoinScreenContainer;
