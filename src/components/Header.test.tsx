import { render, RenderResult } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('Render header with title and description', () => {
    const { getByRole, getByText } = renderHeader('TEST_title', 'TEST_description');

    expect(getByRole('heading', { name: 'TEST_title' })).toBeVisible();
    expect(getByText('TEST_description')).toBeVisible();
  });
});

function renderHeader(title: string, description: string): RenderResult {
  return render(<Header title={title} description={description} />);
}
