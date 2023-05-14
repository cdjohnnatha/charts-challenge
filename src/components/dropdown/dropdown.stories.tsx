import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Dropdown, { DropdownProps } from './Dropdown';

export default {
  title: 'components/dropdown',
  component: Dropdown,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args: DropdownProps) => {
  const [selected, setSelected] = useState<string>('test');

  const onSelect = (selected: string) => {
    setSelected(selected);
  };

  return <Dropdown {...args} selected={selected} onSelect={onSelect} />;
};

export const DefaultDropdown = Template.bind({});
DefaultDropdown.args = {
  options: [
    { value: 'test', label: 'Test' },
    { value: 'test2', label: 'Test 2' },
  ],
  label: 'Dropdown',
  name: 'custom-dropdown',
  disabled: false,
};
