import * as React from "react";
import { Form, Input } from "semantic-ui-react";
import InfoLabel from "./InfoLabel";
import { observer, inject } from "mobx-react";

export const NameInput: React.SFC<{
  title: string;
  note?: string;
  value: string;
  wiki?: string;
  index?: number;
}> = inject("settings", "appSettings")(
  observer(
    ({
      wiki = "",
      title,
      value,
      settings: { updateField },
      appSettings: { selectedMenuItem },
      index
    }) => {
      const handleChange = (evt, { value }) => {
        // this.value = value; TODO
        updateField(selectedMenuItem, title, value, index);
      };

      return (
        <div>
          <Form.Field>
            <InfoLabel title={title} wiki={wiki} />
            <Input
              placeholder={title}
              type="text"
              name={title}
              size="mini"
              value={value}
              onChange={handleChange}
            />
          </Form.Field>
        </div>
      );
    }
  )
);
