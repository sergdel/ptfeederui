import React, { Component } from "react";
import _ from "lodash";
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
				<h2>Volume</h2>

				<Grid columns={3} divided padded>
					<Grid.Row>
						<Grid.Column>
							<Form>
								<Form.Group>
									<DropdownExampleSearchSelection />
									<Button padded>+</Button>
								</Form.Group>
							</Form>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default VolumeComponent;
