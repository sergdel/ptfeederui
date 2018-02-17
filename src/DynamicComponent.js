import React, { Component } from "react";
import Volume from "./Volume";
import Dropdown from "./Dropdown";
import NumberInput from "./NumberInput";

class DynamicComponent extends Component {
	state = {};

	components = {
		Volume: <Volume />,
		Dropdown: <Dropdown />,
		Number: <NumberInput />
	};

	render() {
		const { data: {title, options, allowAdditions, type} } = this.props;

		switch (type) {
			case "Volume":
				return <Volume />;
				break;
			case "Dropdown":
				return (
					<Dropdown
						title={title}
						options={options}
						allowAdditions={allowAdditions}
					/>
				);
				break;
			case "Number":
				return (
					<NumberInput title={title}/>
					)
				break;
			default:
				return <div />;
		}
	}
}

export default DynamicComponent;
