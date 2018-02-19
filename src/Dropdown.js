import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dropdown, Form, Label } from "semantic-ui-react";
import InfoLabel from "./InfoLabel";

export default class DropDown extends PureComponent {
	state = {
		options: this.props.options
	};

	PropTypes = {
		options: PropTypes.array.required,
		allowAdditions: PropTypes.bool
	};

	handleAddition = (e, { value }) => {
		const { options } = this.state;
		this.setState({
			options: options.concat({
				key: value,
				value: value,
				text: value
			})
		});
	};

	handleChange() {}

	render() {
		const { title, allowAdditions } = this.props;
		const { options } = this.state;
		return (
			<Form.Field style={{ paddingTop: "20px" }}>
				<InfoLabel title={title} />
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
