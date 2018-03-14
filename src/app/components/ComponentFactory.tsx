import * as React from "react";
import { DropDown, NumberInput, NameInput } from "../components";
import { observer, inject } from "mobx-react";

export const ComponentFactory: React.SFC<any> = inject(
  "appSettings",
  "settings",
  "componentDefinitions"
)(
  observer(
    ({
      settings: { updateField },
      appSettings: { selectedMenuItem, advancedMode },
      componentDefinitions,
      item,
      value,
      index
    }) => {
      const componentMeta = componentDefinitions.componentTypeForFieldName(
        item
      );

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
              index={index}
            />
          );
        case "String":
          return (
            <NameInput title={title} value={value} wiki={wiki} index={index} />
          );
        default:
          return <div />;
      }
    }
  )
);
