import React, { Component } from "react";
import VolumeData from "./VolumeData.js";
import {
	Button,
	Icon,
	Grid,
	Accordion,
	Form,
	Menu,
	Sidebar,
	Segment,
	Dropdown
} from "semantic-ui-react";

const VolumeForm = (
	<Form>
		<Form.Group grouped>
			<Form.Input label="MaxVolume" name="volume" value={0} />
			<Form.Input label="CostOffset" name="volume" value={0} />
			<Form.Input label="BuyValueOffset" name="volume" value={0} />
		</Form.Group>
	</Form>
);

const countryOptions = [
	{ key: "af", value: "af", flag: "af", text: "Afghanistan" }
];

const DropdownExampleSearchSelection = () => (
	<Dropdown
		placeholder="Select Country"
		fluid
		search
		selection
		options={VolumeData}
	/>
);

class VolumeComponent extends Component {
	state = { activeIndex: 0, selectedMenuItem: "" };

	render() {
		const { activeIndex } = this.state;

		return (
			<div>
				<DropdownExampleSearchSelection />

				<Accordion vertical>
					<Menu.Item>
						<Accordion.Title
							active={activeIndex === 1}
							content="Volume"
							index={1}
							onClick={this.handleClick}
						/>
						<Accordion.Content
							active={activeIndex === 1}
							content={VolumeForm}
						/>
					</Menu.Item>
				</Accordion>
			</div>
		);
	}
}

export default VolumeComponent;
