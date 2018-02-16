import React, { Component } from "react";
import PropTypes from "prop-types";
import { textColour, background, foreground } from "./colours";
import { Form, List } from "semantic-ui-react";

class NumberInput extends Component {


	PropTypes = {
		percentage: PropTypes.bool
	}

	onKeyPress = event => {
		const keyCode = event.keyCode || event.which;
		const keyValue = String.fromCharCode(keyCode);

		if (!/^[0-9]{1,45}$/.test(keyValue)) {
			event.preventDefault();
		}
	};

	state = {
		name: this.props.name
	};

	render() {

		const { percentage } = this.props;

		return (
			<Form.Field inline={false} style={{paddingTop: "20px"}}>
				<label
					style={{
						backgroundColor: background,
						color: textColour,
						textAlign: "left"
					}}
				>
					{this.props.name}
					<input
						type="text"
						size="large"
						pattern="[0-9]*"
						placeholder={this.props.name}
						control="input"
						style={{
							backgroundColor: foreground,
							color: textColour
						}}
						onKeyPress={this.onKeyPress}
					/>
				</label>
			</Form.Field>
		);
	}
}

export default NumberInput;
