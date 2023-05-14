import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Card, { CardProps } from './Card';

export default {
  title: 'components/card',
  component: Card,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args: CardProps) => <Card {...args} />;

export const DefaultCard = Template.bind({});

DefaultCard.args = {
  title: 'This is a card',
  description: 'short description',
  id: 'card-id',
  children: <h1>Any children</h1>,
};
