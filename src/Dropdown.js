import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dropdown, Form, Label } from "semantic-ui-react";

export default class DropDown extends PureComponent {
	PropTypes = {
		options: PropTypes.array.required,
		allowAdditions: PropTypes.bool
	};

	handleAddition() {}
	handleChange() {}

	render() {
		const { options, title, allowAdditions } = this.props;
		return (
			<Form.Field style={{ paddingTop: "20px" }}>
				<Label>{title}</Label>
				<Dropdown
					placeholder={title}
					size="large"
					id={title}
					fluid
					labeled={true}
					label={title}
					search
					selection
					name={title}
					options={options}
					allowAdditions={allowAdditions}
					onAddItem={this.handleAddition}
					onChange={this.handleChange}
				/>
			</Form.Field>
		);
	}
}
