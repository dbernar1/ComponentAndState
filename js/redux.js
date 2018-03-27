import { createStore, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';

const numItemsToLoadAtATime = 20;

const actionTypes = {
	REFRESH: 'refresh',
	REFRESHED: 'refreshed',
	LOADED_MORE: 'loadedMore',
	LOAD_INITIAL: 'loadInitial',
	LOADED_INITIAL: 'loadedInitial',
	LOAD_MORE: 'fetching',
};

const initialState = {
	coinData: [],
	refreshing: false,
	numItemsLoadedSoFar: 0,
	currentlyLoadingMore: false,
	initialLoading: false,
};

export const createMyStore = () => createStore( ( state = initialState, action ) => {
	switch( action.type ) {
		case actionTypes.REFRESH:
			return {
				...state,
				refreshing: true,
			};
		break;
		case actionTypes.REFRESHED:
			return {
				...state,
				refreshing: false,
				numItemsLoadedSoFar: numItemsToLoadAtATime,
				coinData: action.coinData,
			};
		break;
		case actionTypes.LOAD_INITIAL:
			return {
				...state,
				initialLoading: true,
			};
		break;
		case actionTypes.LOADED_INITIAL:
			return {
				...state,
				initialLoading: false,
				coinData: action.coinData,
				numItemsLoadedSoFar: numItemsToLoadAtATime,
			};
		break;
		case actionTypes.LOADED_MORE:
			return {
				...state,
				coinData: state.coinData.concat( action.coinData ),
				numItemsLoadedSoFar: state.numItemsLoadedSoFar + numItemsToLoadAtATime,
				currentlyLoadingMore: false,
			};
		break;
		case actionTypes.LOAD_MORE:
			return {
				...state,
				currentlyLoadingMore: true,
			};
		break;
		default:
			return state;
		break;
	}
}, applyMiddleware( thunk ) );

const fetchCoinData = ( startPosition ) => {
	const coinAPIBaseURL = 'https://api.coinmarketcap.com';

	const url = `${coinAPIBaseURL}/v1/ticker/?limit=${ numItemsToLoadAtATime }&start=${ startPosition }`;

	return fetch( url )
	.then( response => response.json() )
	.catch( error => console.error(error) );
};

const actions = {
	loadMore() {
		return ( dispatch, getState ) => {
			const { numItemsLoadedSoFar, currentlyLoadingMore, } = getState();

			if ( currentlyLoadingMore ) {
				return;
			}

			dispatch( {
				type: actionTypes.LOAD_MORE,
			} );

			fetchCoinData( numItemsLoadedSoFar )
			.then( coinData => dispatch( {
				type: actionTypes.LOADED_MORE,
				coinData,
			} ) );
		};
	},
	refreshCoinData() {
		return ( dispatch, getState ) => {
			dispatch( {
				type: actionTypes.REFRESH,
			} );

			setTimeout( () => {
				fetchCoinData( 0 )
				.then( coinData => dispatch( {
					type: actionTypes.REFRESHED,
					coinData,
				} ) );
			}, 500 );

		};
	},
	loadInitialData() {
		return ( dispatch, getState ) => {
			dispatch( {
				type: actionTypes.LOAD_INITIAL,
			} );

			const { numItemsLoadedSoFar } = getState();

			fetchCoinData( numItemsLoadedSoFar )
			.then( coinData => dispatch( {
				type: actionTypes.LOADED_INITIAL,
				coinData,
			} ) );
		};
	},
};

export const connecty = ( piecesOfDataToMakeAvailable, actionsToMakeAvailable ) => connect(
	state => {
		const props = {};

		piecesOfDataToMakeAvailable.forEach( key => props[ key ] = state[ key ] );

		return props;
	},
	dispatch => {
		const componentActions = {};

		actionsToMakeAvailable.forEach( actionName => componentActions[ actionName ] = () => dispatch( actions[ actionName ]() ) );
return componentActions;
	}
);
