import React, { Component } from "react";
import Dropdown from "./Dropdown";
import NumberInput from "./NumberInput";
import { Form, Input } from "semantic-ui-react";

export const ComponentGroup = ({ group }) => (
	<div>
		{group &&
			group.map(item => (
				<DynamicComponent
					category={group.title}
					tag={item.type}
					data={item}
				/>
			))}
	</div>
);

class DynamicComponent extends Component {
	state = {};

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

			case "Boolean":
				return (
					<Dropdown
						title={title}
						options={[
							{ key: "true", value: "true", text: "true" },
							{ key: "false", value: "false", text: "false" }
						]}
					/>
				);
			case "String":
				return (
					<Form.Field style={{ paddingTop: "20px" }}>
						<Input placeholder={title} label={title} type="text" />
					</Form.Field>
				);
			default:
				return <div />;
		}
	}
}

export default DynamicComponent;
