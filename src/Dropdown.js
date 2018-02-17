import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
import { textColour, background, foreground } from "./colours";
import { Dropdown, Form } from "semantic-ui-react";

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
			<Form.Field inline={false} style={{ paddingTop: "20px" }}>
				<label
					style={{
						color: textColour,
						textAlign: "left"
					}}
				>
					{title}

					<Dropdown
						placeholder={title}
						size="large"
						fluid
						search
						selection
						options={options}
						allowAdditions={allowAdditions}
						onAddItem={this.handleAddition}
						onChange={this.handleChange}
					/>
				</label>
			</Form.Field>
		);
	}
}
