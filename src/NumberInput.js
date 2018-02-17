import React, { Component } from "react";
import PropTypes from "prop-types";
import { textColour, background, foreground } from "./colours";
import { Form, List, Input, Dropdown } from "semantic-ui-react";

class NumberInput extends Component {
	PropTypes = {
		percentage: PropTypes.bool,
		acceptBoolean: PropTypes.bool
	};

	onKeyPress = event => {
		const { percentage } = this.props;
		const keyCode = event.keyCode || event.which;
		const keyValue = String.fromCharCode(keyCode);
		const currentInputValue = event.target.value;

		const validPercentage = num => {
			return /^((0|[1-9]\d?)(\.\d{1,2})?|100(\.00?)?)$/.test(num);
		};

		if (!/^[0-9]{1,45}$/.test(keyValue)) {
			event.preventDefault();
		}

		if (
			percentage &&
			currentInputValue &&
			!validPercentage(currentInputValue + keyValue)
		) {
			event.preventDefault();
		}
	};

	state = {
		name: this.props.name
	};

	render() {
		const { percentage, acceptBoolean, title } = this.props;

		if (acceptBoolean) {
			return (
				<Form.Field inline={false} style={{ paddingTop: "20px" }}>
					<label
						style={{
							color: textColour,
							textAlign: "left"
						}}
					>
						{this.props.title}
						<br />
						<Dropdown
							placeholder={title}
							size="large"
							fluid
							search
							selection
							options={[
								{ key: "true", value: "true", text: "true" },
								{ key: "false", value: "false", text: "false" }
							]}
							allowAdditions={true}
							onAddItem={this.handleAddition}
							onKeyPress={this.onKeyPress}
							onChange={this.handleChange}
						/>
					</label>{" "}
					{percentage ? "%" : ""}
				</Form.Field>
			);
		}

		return (
			<Form.Field inline={false} style={{ paddingTop: "20px" }}>
				<label
					style={{
						color: textColour,
						textAlign: "left"
					}}
				>
					{this.props.title}
					<br />
					<Input
						type="text"
						size="small"
						pattern="[0-9]*"
						placeholder={this.props.title}
						control="input"
						onKeyPress={this.onKeyPress}
					/>
				</label>{" "}
				{percentage ? "%" : ""}
			</Form.Field>
		);
	}
}

export default NumberInput;
