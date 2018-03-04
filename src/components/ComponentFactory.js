import React, { Component } from "react";
import Dropdown from "./Dropdown";
import NumberInput from "./NumberInput";
import { Form, Input } from "semantic-ui-react";
import InfoLabel from "./InfoLabel";

export class ComponentFactory extends Component {
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
        note,
        wiki,
        value,
        advanced
      },
      registerField,
      advancedMode
    } = this.props;

    if (advanced && !advancedMode) return null;

    switch (type) {
      case "Dropdown":
        return (
          <Dropdown
            title={title}
            options={options}
            allowAdditions={allowAdditions}
            wiki={wiki}
            curvalue={value}
            ref={input => {
              registerField(title, input);
            }}
          />
        );
      case "Number":
        return (
          <NumberInput
            acceptBoolean={acceptBoolean}
            percentage={percentage}
            title={title}
            note={note}
            wiki={wiki}
            curvalue={value}
            ref={input => {
              registerField(title, input);
            }}
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
            wiki={wiki}
            curvalue={value}
            ref={input => {
              registerField(title, input);
            }}
          />
        );
      case "String":
        return (
          <Form.Field>
            <InfoLabel title={title} wiki={wiki} />
            <Input
              placeholder={title}
              type="text"
              name={title}
              size="mini"
              curvalue={value}
              ref={input => {
                registerField(title, input);
              }}
            />
          </Form.Field>
        );
      default:
        return <div />;
    }
  }
}
