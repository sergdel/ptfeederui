import React, { Component } from "react";
import {
	Button,
	Icon,
	Grid,
	Accordion,
	Form,
	Menu,
	Sidebar,
	Segment
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

class VolumeComponent extends Component {
	state = { activeIndex: 0, selectedMenuItem: "" };

	render() {
		const { activeIndex } = this.state;

		return (
			<div>
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
