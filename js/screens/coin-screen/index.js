import React, { Component } from 'react';
import LoadingScreen from './components/loading'
import Coins from './component.js'
import { Provider, } from 'react-redux';
import { createMyStore, connecty, } from '../../redux';

const myStore = createMyStore();

const App = () => <Provider store={ myStore }>
	<CoinScreenContainer />
</Provider>;

export default App;













// Details...

const CoinScreenContainer = connecty(
	[ 'initialLoading', ],
	[ 'loadInitialData', ],
)( class extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		if ( this.props.initialLoading ) {
			return <LoadingScreen />;
		} else {
			return <Coins />;
		}
	}
} );
