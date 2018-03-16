import * as React from "react";
import { inject, observer } from "mobx-react";
import { ComponentFactory, Preloader } from "app/components";
import { componentDefinitions, settings } from "app/stores";
import { CLIENTONLY, APP_SETTINGS, SETTINGS } from "app/constants";
import logo from "../../../assets/logo.png";
import deepEqual from "deep-equal";
import _ from "lodash";
// import { filter as fuzzy } from "fuzzy";
import {
  Grid,
  Segment,
  Label,
  Checkbox,
  Sticky,
  Menu,
  Input,
  Divider,
  Header,
  Form,
  Button,
  Responsive
} from "semantic-ui-react";

// const styles = {
//   background: '#263342',
//   foreground: '#2F4259',
//   lightBlue: '#2F4259',
//   textColour: '#ffffff',
//   primary: '#2F3959'
// };

componentDefinitions;
settings;
export const ConfigurationApp: React.SFC<any> = inject(
  "settings",
  "componentDefinitions",
  "appSettings"
)(
  observer(
    ({
      settings: { menuItems },
      componentDefinitions,
      appSettings: { selectMenuItem, advancedMode, isLoaded }
    }) => {
      return isLoaded || process.env.NODE_ENV === "client" ? (
        <GridBody />
      ) : (
        <Responsive as={Grid} style={{ height: "100vh" }} centered>
          <Grid.Row columns={1} verticalAlign="middle">
            <Grid.Column style={{ textAlign: "center" }}>
              <Preloader />
            </Grid.Column>
          </Grid.Row>
        </Responsive>
      );
    }
  )
);

const GridBody: React.SFC<{}> = inject(
  "appSettings",
  "settings",
  "componentDefinitions"
)(
  observer(
    ({
      appSettings: {
        menuItems,
        advancedMode,
        selectedMenuItem,
        setFilter,
        filter
      },
      settings: { getMenuData, save },
      componentDefinitions: { menuItemsMeta }
    }) => {
      const menuData = getMenuData(selectedMenuItem);
      const menuMeta = menuItemsMeta(selectedMenuItem);
      const { description = "" } = menuMeta;
      return (
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <TopMenu />
              <StatusIndicators
                BaseCoinPrice={0}
                CurrentMarketCondition={0}
                TopCoinChange={0}
              />
              <AdvancedModeToggle
                checked={advancedMode}
                onChecked={checked => {}}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" stretched centered padded="true">
            <Grid.Column>
              <Segment basic>
                <LeftNav />
              </Segment>
            </Grid.Column>
            {/* Main Content */}
            <Grid.Column>
              <Grid.Column width={5}>
                <Input
                  icon="search"
                  type="text"
                  placeholder="Search..."
                  onChange={(e, target: { value }) => {
                    setFilter(target.value);
                  }}
                  transparent
                  fluid
                  small="true"
                  inverted
                  padded="false"
                />

                <Divider />
                <Form inverted id="form" action="">
                  <Header
                    style={{
                      color: "white"
                    }}
                  >
                    {selectedMenuItem}
                  </Header>

                  {selectedMenuItem !== "General" && (
                    <Label
                      fluid
                      tiny="true"
                      style={{ cursor: "pointer" }}
                      onClick={e => {
                        e.preventDefault();
                        settings.addConfigGroup(selectedMenuItem);
                      }}
                    >
                      + add config
                    </Label>
                  )}

                  {menuData["Configs"] ? (
                    menuData["Configs"].map(
                      (configObject: object, index: number) => (
                        <ConfigGroup
                          configObject={Object.entries(configObject)}
                          configGroupIndex={index}
                          key={index}
                        />
                      )
                    )
                  ) : (
                    <ConfigGroup
                      configObject={Object.entries(menuData)}
                      configGroupIndex={-1}
                    />
                  )}
                </Form>
              </Grid.Column>
            </Grid.Column>

            {/* RIGHT Side  */}
            <Responsive as={Grid.Column} {...Responsive.onlyComputer}>
              <Grid.Row>
                <ImportExport
                  save={() => settings.save()}
                  // export={this.export}
                  // import={this.import}
                />
                <Segment basic style={{ color: "#fff" }}>
                  <strong>{description ? description : ""}</strong>
                </Segment>
              </Grid.Row>
            </Responsive>
          </Grid.Row>
        </Grid>
      );
    }
  )
);

const ConfigGroup: React.SFC<any> = inject(SETTINGS, APP_SETTINGS)(
  observer(
    ({
      configObject,
      appSettings: { selectedMenuItem, filter },
      configGroupIndex
    }) => {
      return (
        <Segment
          style={{
            marginTop: "30px",
            backgroundColor: "#2F4259",
            padding: "30px",
            borderRadius: "30px",
            border: "none",
            boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.55)"
          }}
        >
          <Form.Field>
            {configObject.map(
              value =>
                new RegExp(filter, "i").test(value[0]) && (
                  <ComponentFactory
                    key={value[0]}
                    item={value[0]}
                    value={value[1]}
                    index={configGroupIndex}
                  />
                )
            )}

            {selectedMenuItem !== "General" && (
              <Label
                attached="top right"
                style={{ cursor: "pointer" }}
                as="a"
                tag
                color="grey"
                // circular={true}
                onClick={e => {
                  e.preventDefault();
                  settings.removeConfigGroup(
                    selectedMenuItem,
                    configGroupIndex
                  );
                }}
              >
                remove config
              </Label>
            )}
          </Form.Field>
        </Segment>
      );
    }
  )
);

const TopMenu: React.SFC<{}> = () => {
  return (
    <Header
      style={{
        border: "noneindex",
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
              href={"https://github.com/mehtadone/PTFeeder"}
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

const StatusIndicators: React.SFC<any> = inject(APP_SETTINGS, SETTINGS)(
  observer(
    ({
      BaseCoinPrice,
      CurrentMarketCondition,
      TopCoinChange,
      settings: { snapshot },
      appSettings: { connected, getSettingsFromLS }
    }) => {
      return (
        <Segment basic floated="right">
          {connected ? (
            <Label circular color={"green"}>
              Connected
            </Label>
          ) : (
            <Label circular color={"red"}>
              Offline
            </Label>
          )}
          {CLIENTONLY && (
            <Label circular color={"blue"}>
              Debug
            </Label>
          )}
          <Label>
            BaseCoinPrice <Label.Detail>{BaseCoinPrice || 0}</Label.Detail>
          </Label>
          <Label>
            CurrentMarketConditions
            <Label.Detail>{CurrentMarketCondition || 0}</Label.Detail>
          </Label>
          <Label>
            TopCoinChangee <Label.Detail>{TopCoinChange || 0}</Label.Detail>
          </Label>
        </Segment>
      );
    }
  )
);

const ImportExport: React.SFC<any> = inject(SETTINGS, APP_SETTINGS)(
  observer(
    ({
      save,
      fileImport,
      settings: { snapshot },
      appSettings: { getSettingsFromLS, lastData }
    }) => {
      function difference(object, base) {
        function changes(object, base) {
          return _.transform(object, function(result, value, key) {
            if (!_.isEqual(value, base[key])) {
              result[key] =
                _.isObject(value) && _.isObject(base[key])
                  ? changes(value, base[key])
                  : value;
            }
          });
        }
        return changes(object, base);
      }

      const ls = getSettingsFromLS();
      const diff = difference(ls, lastData);
      diff;
      const isDirty = !deepEqual(getSettingsFromLS(), snapshot);

      return (
        <Segment basic>
          {/* <pre style={{ color: "white" }}>{JSON.stringify(diff, null, 2)}</pre> */}
          <Button primary onClick={save} className={isDirty ? "pulse" : ""}>
            Save Settings
          </Button>
          <br />
          {/* {<Button onClick={() => window["ap"](window["sh"].pop())}>Undo</Button>} */}
          <br />
          <Button basic onClick={fileImport}>
            Import Settifdngs
          </Button>
          <br />
          <Button basic href="/download">
            Export Settings
          </Button>
        </Segment>
      );
    }
  )
);
const LeftNav: React.SFC<any> = inject(
  "appSettings",
  "settings",
  "componentDefinitions"
)(
  observer(
    ({
      appSettings: { selectMenuItem, selectedMenuItem, advancedMode },
      settings: { menuItems },
      componentDefinitions: { menuItemsMeta }
    }) => {
      return (
        <Grid.Column width={4} align="center">
          <Sticky>
            <Menu
              vertical
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                boxShadow: "none",
                border: "none",
                width: "auto",
                textAlign: "center"
              }}
            >
              {menuItems.map((item, index) => {
                const blah = menuItemsMeta(item);
                blah;
                return !!!blah.advanced || advancedMode ? (
                  <MenuItem
                    name={item}
                    key={item}
                    active={selectedMenuItem === item}
                    onClick={selectMenuItem.bind(this, item)}
                    style={{
                      color: "white"
                    }}
                    menuIndex={index}
                  >
                    {item}
                  </MenuItem>
                ) : null;
              })}
              {/* <MenuItem
                name="Overrides"
                active={selectedMenuItem === 'Overrides'}
                onClick={() => selectMenuItem('Overrides')}
              >
                Overrides
              </MenuItem> */}
            </Menu>
          </Sticky>
        </Grid.Column>
      );
    }
  )
);
const MenuItem: React.SFC<any> = ({ name, style, active, onClick }) => {
  return (
    <a
      className={active ? "active item" : "item"}
      style={style}
      onClick={onClick}
    >
      {name}
    </a>
  );
};

const AdvancedModeToggle: React.SFC<any> = inject("appSettings")(
  observer(({ appSettings: { advancedMode, toggleAdvancedMode } }) => {
    return (
      <Segment basic align="left" floated="left">
        <Label>Advanced Mode</Label>
        <Checkbox
          onChange={(e, data) => toggleAdvancedMode(data.checked)}
          checked={advancedMode}
        />
      </Segment>
    );
  })
);
