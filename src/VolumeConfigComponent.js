import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, List } from "semantic-ui-react";

class VolumeConfigComponent extends Component {
	state = {
		name: this.props.name
	};

	render() {
		return (
			<Form.Field inline={false}>
				<label>
					{this.props.name}
					<Form.Input
						type="number"
						size="large"
						placeholder={this.props.name}
						control="input"
					/>
				</label>
			</Form.Field>
		);
	}
}

export default VolumeConfigComponent;
