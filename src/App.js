import React, { Component } from "react";
import Volume from "./Volume";
import logo from "./logo.svg";
import "./App.css";
import {
	Button,
	Icon,
	Grid,
	Form,
	Menu,
	Sidebar,
	Segment,
	Container
} from "semantic-ui-react";

class App extends Component {
	state = { selectedMenuItem: "Volume", activeItem: "" };

	menuSelect = item => {
		this.setState({ selectedMenuItem: item });
		console.log("setting selectedMenuItem to ", item);
	};

	render() {
		const menuItems = {
			General: <div>General settings</div>,
			Volume: <Volume />,
			"Price Trend": <div>Price Trend</div>,
			"Market Condition": <div>Market Condition</div>
		};

		const { selectedMenuItem, activeIndex } = this.state;

		return (
			<Container className="App" style={{ height: "600px" }}>
				<Grid>
					<Grid.Column width={4}>
						<Menu fluid vertical tabular>
							<Menu.Item name="logo">Logo</Menu.Item>
							{Object.keys(menuItems).map(item => (
								<Menu.Item
									name={item}
									key={item}
									onClick={() => this.menuSelect(item)}
								>
									{item}
								</Menu.Item>
							))}
						</Menu>
					</Grid.Column>

					<Grid.Column stretched width={12}>
						{Object.keys(menuItems).map(item => (
							<Segment
								hidden={selectedMenuItem !== item}
								centered
							>
								{menuItems[item]}
							</Segment>
						))}
					</Grid.Column>
				</Grid>
			</Container>
		);
	}
}

export default App;
