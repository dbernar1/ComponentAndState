import { StyleSheet } from 'react-native';

const imageSize = 20;

export default StyleSheet.create( {
	container: {
		flex: 1,
		marginRight: 10,
		marginLeft: 10,
	},
	appHeading: {
		marginTop: 40,
		marginBottom: 20,
		textAlign: 'center',
	},
	coinPriceItem: {
		flexDirection: 'row',
		flex: 1,
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'black',
	},
	coinImage: {
		width: imageSize,
		height: imageSize,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	coinSymbol: {
		//flex: 1,
		fontWeight: 'bold',
	},
	coinName: {
		//flex: 1,
	},
	coinPrice: {
		//flex: 1,
		fontWeight: 'bold',
	},
	coinPercentChange24H: {
		//flex: 1,
		color: 'darkred',
		fontWeight: 'bold',
	},
	flexRow: {
		flexDirection: 'row',
	},
	boldText: {
		fontWeight: 'bold',
	},
} );
