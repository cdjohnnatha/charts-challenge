import { render, RenderResult } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('Render header with title and description', () => {
    const { getByRole } = renderHeader('TEST_title');
    expect(getByRole('heading', { name: 'TEST_title' })).toBeVisible();
  });
});

function renderHeader(title: string): RenderResult {
  return render(<Header title={title} />);
}
