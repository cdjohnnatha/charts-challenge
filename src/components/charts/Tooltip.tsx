import styled from 'styled-components';
import { spacing, palette } from '../../packages/theme';

const Tooltip = styled.div<{ color: string }>(({ color }) => ({
  padding: spacing(1),
  marginLeft: spacing(3),
  color,
  background: palette.white,
  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
}));

export default Tooltip;
