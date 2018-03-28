import React, { Component } from 'react';
import LoadingScreen from './components/loading'
import Coins from './component.js'
import { Provider, connect, } from 'react-redux';
import { createMyStore, connecty, } from '../../redux';
import { StackNavigator } from 'react-navigation';
import { findWhere } from 'underscore';
import { CoinImage } from './component';

const myStore = createMyStore();

const App = () => <Provider store={ myStore }>
	<Nav />
</Provider>;

export default App;













// Details...

const CoinScreenContainer = connecty(
	[ 'initialLoading', ],
	[ 'loadInitialData', ],
)( class extends Component {
	static navigationOptions = {
		title: 'Coin Prices',
	};

	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		if ( this.props.initialLoading ) {
			return <LoadingScreen />;
		} else {
			return <Coins navigation={ this.props.navigation } />;
		}
	}
} );

const CoinDetail = connect(
	(
		{ coinData },
		{ navigation }
	) => {
		
		return {
			coin: findWhere(
				coinData,
				{ symbol: navigation.state.params.symbol, }
			),
		};
	}
)( class extends Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: navigation.state.params.name,
	} );

	render() {
		return <CoinImage name={ this.props.coin.name } />;
	}
} );

const Nav = StackNavigator( {
	CoinList: {
		screen: CoinScreenContainer,
	},
	CoinDetail: {
		screen: CoinDetail,
	},
} );
