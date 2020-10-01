import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { colors } from '../../Theme/Colors'
import { SIZES } from '../../Theme/Constants'

interface Props {
	title?: string;
	onPress?: any;
	disabled?: boolean;
	btnStyle?: object;
	textStyle?: object;
	borderButton?: boolean;
	borderStyle?: object;
	shadowButton?: boolean;
	btnSize?: string;
}

interface State {}

export default class Button extends PureComponent<Props, State> {
	static propTypes: {
		title: PropTypes.Validator<string>
		onPress: PropTypes.Validator<(...args: any[]) => any>
  	}
	static defaultProps: {
		title: string;
		disabled?: boolean;
		borderButton?: boolean;
		onPress: () => void;
		shadowButton?: boolean;
		btnSize?: string;
	}
	
	render(){
		const {
			title,
			onPress,
			btnStyle,
			disabled,
			textStyle,
			borderButton,
			borderStyle,
			shadowButton,
			btnSize
		} = this.props;
		
		return(
			<>
				<TouchableOpacity
					style={[
						styles.container,
						{width: btnSize === 'small' ? '25%' : btnSize === 'medium' ? '50%' : '100%'},
						disabled && styles.disabledBtnView,
						shadowButton && styles.shadowButton,
						borderButton ? styles.borderButton : {},
						borderStyle,
						btnStyle
					]}
					disabled={disabled}
					onPress={() => onPress()}
				>
					<View style={{ flexDirection: 'row' }}>
						<Text style={[
							styles.title,
							borderButton && styles.borderButtonText,
							disabled && styles.btnDisabledTxt,
							textStyle
						]}>
							{title}
						</Text>
					</View>
				</TouchableOpacity>
			</>
		)
	}
}

Button.propTypes = {
	title: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired
}
Button.defaultProps = {
	title: 'BorderButton',
	disabled: false,
	borderButton: false,
	onPress: () => {},
	shadowButton: false,
	btnSize: 'large'
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		borderRadius: 4,
		height: SIZES(44),
		backgroundColor: colors.green50,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	shadowButton: {
		elevation: 7,
		shadowOffset: { width: SIZES(1), height: SIZES(2) },
		shadowColor: colors.black,
		shadowOpacity: 0.2,
		shadowRadius: 2
	},
	title: {
		color: colors.white,
		fontSize: SIZES(16)
	},
	borderButton: {
		backgroundColor: colors.white,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'red'
	},
	borderButtonText: {
		color: 'red',
		fontSize: SIZES(16)
	},
	disabledBtnView: {
		backgroundColor: colors.grey10
	},
	btnDisabledTxt: {
		color: colors.grey100
	},
})