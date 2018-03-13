import * as React from "react";
import { DropDown, NumberInput, InfoLabel } from "../components";
import { Form, Input } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

export const ComponentFactory: React.SFC<{
  item: string;
  value: string;
  index: number;
}> = inject("appSettings", "componentDefinitions", "settings")(
  observer(
    ({
      appSettings: { advancedMode, selectedMenuItem },
      settings: { updateField },
      componentDefinitions,
      item,
      value,
      index
    }) => {
      const componentMeta = componentDefinitions.componentTypeForFieldName(
        item
      );

      const handleChange = (evt, { value }) => {
        updateField(selectedMenuItem, title, value);
      };

      if (!componentMeta) return null;
      const {
        title,
        acceptBoolean,
        wiki,
        note,
        options,
        allowAdditions,
        advanced,
        percentage
      } = componentMeta;
      if (advanced && !advancedMode) return null;
      switch (componentMeta.type) {
        case "Dropdown":
          return (
            <DropDown
              title={title}
              options={options.peek()}
              allowAdditions={allowAdditions}
              wiki={wiki}
              value={value}
              onChange={handleChange}
              index={index}
            />
          );

        case "Number":
          return (
            <NumberInput
              acceptBoolean={acceptBoolean}
              percentage={percentage}
              title={title}
              note={note}
              value={value}
              wiki={wiki}
              onChange={handleChange}
              index={index}
            />
          );
        case "Boolean":
          return (
            <DropDown
              title={title}
              options={[
                { key: "true", value: "true", text: "true" },
                { key: "false", value: "false", text: "false" }
              ]}
              wiki={wiki}
              value={value}
              onChange={handleChange}
              index={index}
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
                onChange={handleChange}
                value={value}
                index={index}
              />
            </Form.Field>
          );
        default:
          return <div />;
      }
    }
  )
);
