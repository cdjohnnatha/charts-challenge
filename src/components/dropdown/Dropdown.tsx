import React from 'react';
import styled from 'styled-components';
import { spacing, typography } from '../../packages/theme';

type DropdownDataset = {
  label: string;
  value: string;
};

type DropdownProps = {
  dataset: Array<DropdownDataset>;
  label: string;
  name: string;
  selected: string;
  onSelect: (selected: string) => void;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Select = styled.select({
  marginTop: spacing(2),
  height: '2.5rem',
});

const Label = styled.label({
  ...typography.sm,
});

function Dropdown({ dataset, label, name, selected, onSelect }: DropdownProps) {
  const onDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} id="metrics-dropdown" onChange={onDropdownChange}>
        {dataset.map(({ label, value }) => (
          <option selected={selected === value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </Container>
  );
}

export default Dropdown;
