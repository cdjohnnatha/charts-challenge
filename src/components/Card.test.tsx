import { render, RenderResult } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('Render card with body filling required title and children', () => {
    const { getByRole, getByText } = renderCard();

    expect(getByRole('heading', { name: 'TEST_title' })).toBeVisible();
    expect(getByText('TEST_Body')).toBeVisible();
  });

  it('Render card with description when description is available', () => {
    const { getByRole, getByText } = renderCard('TEST_description');

    expect(getByRole('heading', { name: 'TEST_title' })).toBeVisible();
    expect(getByText('TEST_description')).toBeVisible();
  });
});

function renderCard(description?: string): RenderResult {
  const title = 'TEST_title';

  return render(
    <Card title={title} description={description}>
      <p>TEST_Body</p>
    </Card>,
  );
}
