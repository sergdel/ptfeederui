import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

class VolumeConfigComponent extends Component {
	state = {
		name: this.props.name
	};

	render() {
		return (
			<Form.Field>
				<label>
					{this.props.name}
					<Form.Input
						type="number"
						size="large"
						placeholder={this.props.name}
					/>
				</label>
			</Form.Field>
		);
	}
}

export default VolumeConfigComponent;
