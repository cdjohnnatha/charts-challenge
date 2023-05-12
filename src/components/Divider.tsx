import styled from 'styled-components';
import { palette } from '../packages/theme';

const Divider = styled.hr({
  flex: '1',
  borderBottom: `1px ${palette.lightGrey}`,
  width: '100%',
});

export default Divider;
