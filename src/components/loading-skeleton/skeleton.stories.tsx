import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Skeleton, { SkeletonProps } from './LoadingSkeleton';

export default {
  title: 'components/skeleton',
  component: Skeleton,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = (args: SkeletonProps) => <Skeleton {...args} />;

export const DefaultSkeleton = Template.bind({});
DefaultSkeleton.args = {
  width: '14rem',
  height: '14rem',
  circle: true,
};
