import React, { Component } from "react";
import Dropdown from "./Dropdown";
import NumberInput from "./NumberInput";

class DynamicComponent extends Component {
	state = {};

	components = {
		Dropdown: <Dropdown />,
		Number: <NumberInput />
	};

	render() {
		const {
			data: {
				title,
				options,
				allowAdditions,
				acceptBoolean,
				type,
				percentage
			}
		} = this.props;

		switch (type) {
			case "Dropdown":
				return (
					<Dropdown
						title={title}
						options={options}
						allowAdditions={allowAdditions}
					/>
				);
			case "Number":
				return (
					<NumberInput
						title={title}
						acceptBoolean={acceptBoolean}
						percentage={percentage}
					/>
				);
			default:
				return <div />;
		}
	}
}

export default DynamicComponent;
