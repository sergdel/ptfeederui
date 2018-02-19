import React, { Component } from "react";
import Dropdown from "./Dropdown";
import NumberInput from "./NumberInput";
import { Form, Input, Label, Popup } from "semantic-ui-react";
import InfoLabel from "./InfoLabel";

export const ComponentGroup = ({ group }) => (
	<div>
		{group &&
			group.map(item => (
					<ComponentFactory
						category={group.title}
						tag={item.type}
						data={item}
					/>
			))}
	</div>
);

class ComponentFactory extends Component {
	state = {};

	render() {
		const {
			data: {
				title,
				options,
				allowAdditions,
				acceptBoolean,
				type,
				percentage,
				note
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
						acceptBoolean={acceptBoolean}
						percentage={percentage}
						title={title}
						note={note}
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
					<Form.Field>
						<InfoLabel title={title} />
						<Input
							placeholder={title}
							type="text"
							name={title}
							size="mini"
						/>
					</Form.Field>
				);
			default:
				return <div />;
		}
	}
}

export default ComponentFactory;
