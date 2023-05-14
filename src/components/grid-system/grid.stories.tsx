import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Grid, Col, Row } from '.';

export default {
  title: 'components/grid',
  component: Grid,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `The Grid Systems utilises three main components: the Grid, Row, and the the Column.`,
      },
    },
  },
} as Meta<typeof Grid>;

const Template: StoryFn<typeof Grid> = (args) => <Grid {...args} />;

export const Default: StoryFn<typeof Grid> = Template.bind({});

Default.decorators = [(storyFn) => <div style={{ width: '100%' }}>{storyFn()}</div>];

const exampleColors = ['#ff00004c', '#00ff154c', '#ff00ff4b', '#d9ff004a'];

const ExampleItem = ({
  children,
  background = exampleColors[0],
}: {
  children: React.ReactNode;
  background?: string;
}) => (
  <div style={{ background, position: 'relative', textAlign: 'center', height: '2rem', lineHeight: '2rem' }}>
    <div />
    {children}
  </div>
);

ExampleItem.defaultProps = {
  background: undefined,
};

Default.args = {
  children: (
    <>
      <Row>
        {[1, 2, 3, 4, 5, 6].map<React.ReactElement<typeof Col>>((val) => (
          <Col key={Math.random()}>
            <ExampleItem>{val}</ExampleItem>
          </Col>
        ))}
      </Row>
      <Row>
        {[1, 2, 3, 4].map<React.ReactElement<typeof Col>>((val) => (
          <Col key={Math.random()}>
            <ExampleItem background={exampleColors[1]}>{val}</ExampleItem>
          </Col>
        ))}
      </Row>
      <Row>
        {[1, 2].map<React.ReactElement<typeof Col>>((val) => (
          <Col key={Math.random()}>
            <ExampleItem background={exampleColors[2]}>{val}</ExampleItem>
          </Col>
        ))}
      </Row>
      <Row>
        {[1].map<React.ReactElement<typeof Col>>((val) => (
          <Col key={Math.random()}>
            <ExampleItem background={exampleColors[3]}>{val}</ExampleItem>
          </Col>
        ))}
      </Row>
    </>
  ),
};
