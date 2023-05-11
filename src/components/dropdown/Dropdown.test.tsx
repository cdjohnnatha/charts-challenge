import { fireEvent, render, RenderResult } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  it('Render proper dropdown', () => {
    const { getByText, getAllByRole, getByRole } = renderCard('value2');

    expect(getAllByRole('option').length).toBe(2);
    expect(getByText('TEST_LABEL')).toBeVisible();
    expect(getByRole('combobox')).toHaveValue('value2');
  });

  it('When clicking an option should trigger onSelect function', () => {
    const onSelect = jest.fn();

    const { getByRole } = renderCard('value2', onSelect);

    const dropdown = getByRole('combobox');

    fireEvent.change(dropdown, { target: { value: 'value2' } });

    expect(onSelect).toBeCalledTimes(1);
    expect(onSelect).toBeCalledWith('value2');
  });
});

function renderCard(selected?: string, onSelect?: (selected: string) => void): RenderResult {
  return render(
    <Dropdown
      dataset={dropdownDataset}
      label="TEST_LABEL"
      name="test-dropdown"
      onSelect={onSelect || jest.fn}
      selected={selected || 'value1'}
    />,
  );
}

const dropdownDataset = [
  {
    label: 'TEST_1',
    value: 'value1',
  },
  {
    label: 'TEST_2',
    value: 'value2',
  },
];
