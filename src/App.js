import React, { Component } from "react";
import { ComponentFactory } from "./components/ComponentFactory";
import logo from "./assets/images/logo.png";
import { config as options } from "./config/config.json";
import { background, textColour } from "./config/constants";
import "./App.css";
import Ajv from "ajv";
import schema from "./config/json.schema.json";
import _ from "lodash";
// import DevTools from "mobx-react-devtools";
import { Form, Input, Label } from "semantic-ui-react";
import f from "fuzzysearch";
import {
  Button,
  Grid,
  Menu,
  Modal,
  Header,
  Divider,
  Sticky,
  Segment,
  Search
} from "semantic-ui-react";
const ajv = new Ajv({ allErrors: true, schemaId: "auto" });
ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));

export default class App extends Component {
  componentWillMount() {
    const validate = ajv.compile(schema);
    const valid = validate(options || {});

    if (valid) console.log("Valid!");
    else console.log("Invalid: " + ajv.errorsText(validate.errors));

    this.setState({
      configHasErrors: Boolean(valid) === false,
      configErrorMessage: ajv.errorsText(validate.errors)
    });
  }

  state = {
    selectedMenuItem: "General",
    availableConfig: null,
    menuItems: options.map(item => {
      return item.title;
    }),
    userData: {},
    savedConfig: {},
    config: options.config,
    configHasErrors: {},
    configErrorMessage: {},
    filter: ""
  };

  onFilterList = (event, { value }) => this.setState({ filter: value });

  onMenuSelect = title => {
    this.setState({ selectedMenuItem: title });
    console.log("setting selectedMenuItem to ", title);
  };

  save = () => {
    const result = Array.from(document.querySelector("form").elements)
      .filter(function(item) {
        return item.name && item.value;
      })
      .map(function(item) {
        return {
          [item.name]: item.value
        };
      });

    this.setState({ savedConfig: result });
  };

  render() {
    const {
      menuItems,
      selectedMenuItem,
      configHasErrors,
      configErrorMessage,
      filter
    } = this.state;

    if (configHasErrors) {
      return <ErrorModal errorMessage={configErrorMessage} />;
    }

    return (
      <Grid
        style={{
          fontFamily: "Poppins",
          width: "height: 90vh",
          overflow: "none"
        }}
        middle="true"
        aligned="true"
        center="true"
      >
        {/* <DevTools /> */}

        {/* HEADER */}
        <Grid.Row columns={1}>
          <Grid.Column>
            <TopMenu activeItem="none" />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row
          columns="equal"
          stretched="stretched"
          centered="centered"
          padded="true"
          style={{
            backgroundColor: background
          }}
        >
          <Grid.Column>
            <Segment basic="basic">
              <LeftNav
                selectedMenuItem={selectedMenuItem}
                menuItems={menuItems}
                onMenuSelect={this.onMenuSelect}
              />
            </Segment>
          </Grid.Column>

          {/* Main Content */}
          <Grid.Column>
            <MainContent
              options={options}
              menuItems={menuItems}
              selectedMenuItem={selectedMenuItem}
              onFilterList={this.onFilterList}
              filter={filter}
            />
          </Grid.Column>
          <Grid.Column>
            <Segment basic="basic">
              <ImportExport />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        {/* FOOTER */}
        <Grid.Row columns={1}>
          <Grid.Column />
        </Grid.Row>
      </Grid>
    );
  }
}

const ImportExport = () => {
  return (
    <Segment floated="floated" attached="attached">
      <Button
        floating="floating"
        primary="primary"
        fluid="fluid"
        onClick={this.save}
      >
        <Label icon="download" />
        Import
      </Button>

      <Divider />
      <Button secondary="primary" fluid="fluid" onClick={this.save}>
        <Label icon="download" />
        Import
      </Button>
    </Segment>
  );
};

const TopMenu = activeItem => {
  return (
    <Header
      style={{
        backgroundColor: background,
        border: "none",
        color: "white",
        boxShadow: "none"
      }}
    >
      <Menu>
        <Menu.Item name="logo" onClick={this.handleItemClick}>
          <img src={logo} alt="icon" />
          PTFeeder
        </Menu.Item>

        <Menu.Menu position="right" padded="true">
          <Menu.Item name="wiki" onClick={this.handleItemClick}>
            <a
              href="https://github.com/mehtadone/PTFeeder/wiki"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wiki
            </a>
          </Menu.Item>

          <Menu.Item name="videos" onClick={this.handleItemClick}>
            <a
              href="https://github.com/mehtadone/PTFeeder/wiki/Videos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Videos
            </a>
          </Menu.Item>

          <Menu.Item name="support" onClick={this.handleItemClick}>
            <a
              href="https://github.com/mehtadone/PTFeeder/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support
            </a>
          </Menu.Item>
          <Menu.Item>
            <Label color="grey">version 0.0.1</Label>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Header>
  );
};

const LeftNav = ({ selectedMenuItem, menuItems, onMenuSelect }) => {
  return (
    <Grid.Column width={4} align="center">
      <Sticky>
        <Menu
          vertical="vertical"
          style={{
            fontFamily: "Poppins",
            fontSize: "16px",
            boxShadow: "none",
            border: "none",
            width: "auto",
            textAlign: "center"
          }}
        >
          {menuItems &&
            menuItems.map(title => (
              <Menu.Item
                name={title}
                key={title}
                active={selectedMenuItem === title}
                onClick={() => onMenuSelect(title)}
                style={{
                  color: textColour
                }}
              >
                {title}
              </Menu.Item>
            ))}
        </Menu>
      </Sticky>
    </Grid.Column>
  );
};

const MainContent = ({
  options,
  menuItems,
  selectedMenuItem,
  onFilterList,
  filter
}) => {
  return (
    <Grid.Column width={5}>
      <Input
        icon="search"
        type="text"
        placeholder="Search..."
        onChange={onFilterList}
        transparent="transparent"
        fluid="fluid"
        small="true"
        inverted="inverted"
        padded="false"
      />

      <Divider />
      <Form inverted="inverted" id="form" action="">
        <Header
          style={{
            color: "white"
          }}
        >
          {selectedMenuItem}
        </Header>
        {menuItems.map(category => (
          <ComponentList
            category={category}
            selectedMenuItem={selectedMenuItem}
            filter={filter}
          />
        ))}
      </Form>
    </Grid.Column>
  );
};

const ComponentList = ({ category, selectedMenuItem, filter }) => {
  return (
    category === selectedMenuItem &&
    _.find(options, { title: category }).options.map(
      data =>
        f(filter.toLowerCase(), data.title.toLowerCase()) && (
          <ComponentFactory data={data} category="category" />
        )
    )
  );
};

const ErrorModal = ({ errorMessage }) => {
  return (
    <Modal open={true}>
      <Modal.Header>ERROR</Modal.Header>
      <Modal.Content image="image">
        <Modal.Description>
          <Header>Malformed Configuration</Header>
          <p>JSON does not match the supplied schema</p>
          <p>{errorMessage}</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
