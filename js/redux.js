import { createStore, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';

const actionTypes = {
	REFRESH: 'refresh',
	REFRESHED: 'refreshed',
	LOAD_MORE: 'loadMore',
	LOADED_MORE: 'loadedMore',
	LOAD_INITIAL: 'loadInitial',
	LOADED_INITIAL: 'loadedInitial',
};

const coinAPIBaseURL = 'https://api.coinmarketcap.com';
const numItemsToLoadAtATime = 20;

const fetchCoinData = ( startPosition ) => {
	const url = `${coinAPIBaseURL}/v1/ticker/?limit=${ numItemsToLoadAtATime }&start=${ startPosition }`;

	return fetch( url )
	.then( response => response.json() )
	.catch( error => console.error(error) );
};

export const loadMore = () => {
	return ( dispatch, getState ) => {
		dispatch( {
			type: actionTypes.LOAD_MORE,
		} );

		const { numItemsLoadedSoFar, fetchesAlreadyDonePreviously, } = getState();

		if ( fetchesAlreadyDonePreviously.includes( numItemsLoadedSoFar ) ) {
			return;
		}

		fetchesAlreadyDonePreviously.push( numItemsLoadedSoFar );

		fetchCoinData( numItemsLoadedSoFar )
		.then( coinData => dispatch( {
			type: actionTypes.LOADED_MORE,
			coinData,
		} ) );
	};
};

export const refreshCoinData = () => {
	return ( dispatch, getState ) => {
		dispatch( {
			type: actionTypes.REFRESH,
		} );

		const { numItemsLoadedSoFar } = getState();

		setTimeout( () => {
			fetchCoinData( numItemsLoadedSoFar )
			.then( coinData => dispatch( {
				type: actionTypes.REFRESHED,
				coinData,
			} ) );
		}, 500 );

	};
};

export const loadInitialData = () => {
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
};

const initialState = {
	coinData: [],
	refreshing: false,
	numItemsLoadedSoFar: 0,
	fetchesAlreadyDonePreviously: [], // to avoid loading same list of coins multiple times
	initialLoading: false,
};

export const createMyStore = () => createStore( ( state = initialState, action ) => {
	switch( action.type ) {
		case actionTypes.REFRESH:
			return {
				...state,
				refreshing: true,
				numItemsLoadedSoFar: 0,
				fetchesAlreadyDonePreviously: [ 0, ],
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
			};
		break;
		case 'LOAD_MORE': // just doesn't do anything. Could just as well remove.
		default:
			return state;
		break;
	}
}, applyMiddleware( thunk ) );
