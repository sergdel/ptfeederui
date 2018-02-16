import React, { Component } from "react";
import PropTypes from "prop-types";
import { textColour, background, foreground } from "./colours";
import { Form, List } from "semantic-ui-react";

class VolumeConfigComponent extends Component {
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
				{/*<div style={{ float: "right" }}>
					<button class="ui icon button" command="Up">
						{" "}
						<i class="up chevron icon" />
					</button>
					<button class="ui icon button" command="Down">
						{" "}
						<i class="down chevron icon" />
					</button>
				</div>*/}
			</Form.Field>
		);
	}
}

export default VolumeConfigComponent;
