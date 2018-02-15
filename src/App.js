import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
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

const SizeForm = (
	<Form>
		<Form.Group grouped>
			<Form.Radio label="Small" name="size" type="radio" value="small" />
			<Form.Radio
				label="Medium"
				name="size"
				type="radio"
				value="medium"
			/>
			<Form.Radio label="Large" name="size" type="radio" value="large" />
			<Form.Radio
				label="X-Large"
				name="size"
				type="radio"
				value="x-large"
			/>
		</Form.Group>
	</Form>
);

class App extends Component {
	state = { activeIndex: 0, selectedMenuItem: "" };

	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({ activeIndex: newIndex });
	};

	menuSelect = item => {
		this.setState({ selectedMenuItem: item });
		console.log("setting selectedMenuItem to ", item);
	};

	render() {
		const menuItems = {
			General: <div>General settings</div>,
			Volume: <div>Volume Settings</div>,
			"Price Trend": <div>Price Trend</div>,
			"Market Condition": <div>Market Condition</div>
		};

		const { selectedMenuItem, activeIndex } = this.state;

		return (
			<div className="App" style={{ height: "800px" }}>
				<Sidebar.Pushable>
					<Sidebar
						as={Menu}
						animation="push"
						visible
						vertical
						width="thin"
						inverted
					>
						<Menu.Item name="logo">Logo</Menu.Item>

						{Object.keys(menuItems).map(item => (
							<Menu.Item
								name="General"
								key={item}
								onClick={() => this.menuSelect(item)}
							>
								{item}
							</Menu.Item>
						))}
					</Sidebar>

					<Sidebar.Pusher>
						{Object.keys(menuItems).map(item => (
							<Segment hidden={selectedMenuItem !== item}>
								{menuItems[item]}
							</Segment>
						))}
					</Sidebar.Pusher>
				</Sidebar.Pushable>

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

export default App;
