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
	Segment
} from "semantic-ui-react";

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
			Volume: <Volume />,
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
			</div>
		);
	}
}

export default App;
