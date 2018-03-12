import * as React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import InfoLabel from './InfoLabel';

export const DropDown: React.SFC<{
  options: Array<object>;
  title: string;
  wiki: string;
  allowAdditions?: boolean;
  value: string;
}> = ({ options, title, wiki, allowAdditions = false, value }) => {
  const handleAddition = (e, { value }) => {
    //   const { options } = this.state;
    //   this.setState({
    //     options: options.concat({
    //       key: value,
    //       value: value,
    //       text: value
    //     })
    //   });
  };

  const handleChange = (evt, { value }) => {
    //   this.value = value;
    //   //console.log (this.value);
    //   console.log(value);
  };

  return (
    <Form.Field style={{ paddingTop: '20px' }}>
      <InfoLabel title={title} wiki={wiki} />
      <Dropdown
        placeholder={value || title}
        size="large"
        id={title}
        fluid
        labeled={true}
        label={title}
        search
        selection
        name={title}
        options={options}
        value={value}
        allowAdditions={allowAdditions}
        onAddItem={handleAddition}
        onChange={handleChange}
      />
    </Form.Field>
  );
};
