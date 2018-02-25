import React, { Component } from "react";
import { ComponentFactory } from "./components/ComponentFactory";
import MenuItem from "./components/MenuItem";
import logo from "./assets/images/logo.png";
import { config as options } from "./config/config.json";
import { background, textColour } from "./config/constants";
import "./App.css";
import Ajv from "ajv";
import schema from "./config/json.schema.json";
import _ from "lodash";
// import DevTools from "mobx-react-devtools";
import { Form, Input, Label } from "semantic-ui-react";
import { post } from "axios";

import f from "fuzzysearch";
import {
  Grid,
  Menu,
  Modal,
  Header,
  Divider,
  Sticky,
  Segment,
  Responsive,
  Popup,
  Checkbox
} from "semantic-ui-react";
const ajv = new Ajv({ allErrors: true, schemaId: "auto" });
ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.registerField = this.registerField.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.fields = [];
    this.savedConfig = {};
    this.state = {
      selectedMenuItem: { title: options[0].title, wiki: options[0].wiki },
      availableConfig: null,
      menuItems: options.map(item => {
        return { title: item.title, wiki: item.wiki };
      }),
      userData: {},
      savedConfig: {},
      config: options.config,
      configHasErrors: {},
      configErrorMessage: {},
      filter: "",
      optionlist: options
    };
  }

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

  onMenuSelect = item => {
    this.setState({
      selectedMenuItem: item
    });
  };

  onFilterList = (event, { value }) => this.setState({ filter: value });

  updateConfig = evt => {
    const url = "/upload";
    const formData = new FormData();
    let file = evt.target.files[0];
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    post(url, formData, config).then(
      function(response) {
        if (response.data.success == true) {
          let newconfig = response.data.configobj.config;
          const validate = ajv.compile(schema);
          const valid = validate(newconfig || {});

          if (valid) {
            let state = this.state;
            state.selectedMenuItem = {
              title: newconfig[0].title,
              wiki: newconfig[0].wiki
            };
            state.menuItems = newconfig.map(item => {
              return { title: item.title, wiki: item.wiki };
            });
            state.config = newconfig.config;
            state.optionlist = newconfig;
            this.setState(state);
            this.forceUpdate();
          }
        }
      }.bind(this)
    );
  };

  save = () => {
    let res = [];
    let state = { ...this.state };
    _.each(Object.keys(this.fields), (item, index) => {
      if (this.fields[item]) {
        res[item] = this.fields[item].value;
      }
    });
    post("/save", { config: res }).then(function(response) {
      console.log(response);
    });
    this.setState(state);
  };

  import = () => {
    this.importButton.click();
  };

  registerField = (title, ref) => {
    this.fields[title] = ref;
  };

  render() {
    const {
      menuItems,
      selectedMenuItem,
      configHasErrors,
      configErrorMessage,
      filter,
      optionlist
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
            <TopMenu activeItem={selectedMenuItem} />
            <StatusIndicators /> <AdvancedToggle />
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
              optionlist={optionlist}
              menuItems={menuItems}
              selectedMenuItem={selectedMenuItem}
              onFilterList={this.onFilterList}
              filter={filter}
              registerField={this.registerField}
            />
          </Grid.Column>

          {/* RIGHT Side  */}
          <Responsive as={Grid.Column} {...Responsive.onlyComputer}>
            <Grid.Row>
              <ImportExport
                save={this.save}
                export={this.export}
                import={this.import}
              />
              <Segment basic style={{ color: "#fff" }}>
                More Info About <strong>{selectedMenuItem.title}</strong> can be
                found on the{" "}
                <a href={selectedMenuItem.wiki}>
                  {selectedMenuItem.title} Wiki
                </a>
              </Segment>
            </Grid.Row>
          </Responsive>
        </Grid.Row>
        {/* FOOTER */}
        <Grid.Row columns={1}>
          <Grid.Column />
        </Grid.Row>
        <div className="hidden">
          <input
            type="file"
            onChange={this.updateConfig}
            ref={input => {
              this.importButton = input;
            }}
          />
        </div>
      </Grid>
    );
  }
}

const AdvancedToggle = () => {
  return <Checkbox toggle label="Advanced Mode" inline />;
};

const StatusIndicators = ({
  BaseCoinPrice,
  CurrentMarketCondition,
  TopCoinChange
}) => {
  return (
    <Segment basic>
      <Label>
        {" "}
        BaseCoinPrice <Label.Detail>{BaseCoinPrice || 0}</Label.Detail>{" "}
      </Label>
      <Label>
        {" "}
        DogCurrentMarketConditions{" "}
        <Label.Detail>{CurrentMarketCondition || 0}</Label.Detail>{" "}
      </Label>
      <Label>
        {" "}
        TopCoinChangee <Label.Detail>{TopCoinChange || 0}</Label.Detail>{" "}
      </Label>
    </Segment>
  );
};

const ImportExport = props => {
  return (
    <Segment basic>
      <Popup
        trigger={
          <a fluid="fluid" href="#" onClick={props.save}>
            <Label icon="save" />
          </a>
        }
        content="save settings"
      />
      <br />
      <Popup
        trigger={
          <a fluid="fluid" href="#" onClick={props.import}>
            <Label icon="upload" />
          </a>
        }
        content="import settings"
      />
      <br />
      <Popup
        trigger={
          <a fluid="fluid" href="/download">
            <Label icon="download" />
          </a>
        }
        content="export settings"
      />
    </Segment>
  );
};

const TopMenu = props => {
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
        <Menu.Item name="logo">
          <img src={logo} alt="icon" />
          PTFeeder
        </Menu.Item>

        <Menu.Menu position="right" padded="true">
          <Menu.Item name="wiki">
            <a
              href={
                "https://github.com/mehtadone/PTFeeder" + props.activeItem.wiki
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Wiki
            </a>
          </Menu.Item>

          <Menu.Item name="videos">
            <a
              href="https://github.com/mehtadone/PTFeeder/wiki/Videos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Videos
            </a>
          </Menu.Item>

          <Menu.Item name="support">
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
            menuItems.map(item => (
              <MenuItem
                name={item.title}
                key={item.title}
                active={selectedMenuItem === item}
                onClick={() => onMenuSelect(item)}
                style={{
                  color: textColour
                }}
                hasTxtFiles={true}
              >
                {item.title}
              </MenuItem>
            ))}
        </Menu>
      </Sticky>
    </Grid.Column>
  );
};

const MainContent = ({
  optionlist,
  menuItems,
  selectedMenuItem,
  onFilterList,
  filter,
  registerField
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
          {selectedMenuItem.title}
        </Header>
        {menuItems.map(item => (
          <ComponentList
            category={item.title}
            selectedMenuItem={selectedMenuItem}
            filter={filter}
            registerField={registerField}
            optionlist={optionlist}
          />
        ))}
      </Form>
    </Grid.Column>
  );
};

const ComponentList = ({
  category,
  selectedMenuItem,
  filter,
  registerField,
  optionlist
}) => {
  let currentOptions = _.find(optionlist, { title: category });

  return (
    category === selectedMenuItem.title &&
    currentOptions.options.map(
      data =>
        f(filter.toLowerCase(), data.title.toLowerCase()) && (
          <ComponentFactory
            data={data}
            category="category"
            registerField={registerField}
          />
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
