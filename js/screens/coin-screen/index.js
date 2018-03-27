import React, { Component } from 'react';
import LoadingScreen from './components/loading'
import Coins from './component.js'
import { Provider, connect } from 'react-redux';
import { createMyStore, loadInitialData, } from '../../redux';

const myStore = createMyStore();

const App = () => <Provider store={ myStore }>
	<CoinScreenContainer />
</Provider>;

export default App;













// Details...

const CoinScreenContainer = connect(
	( { initialLoading } ) => ( {
		initialLoading,
	} ),
	dispatch => ( {
		loadInitialData: () => dispatch( loadInitialData() ),
	} )
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
