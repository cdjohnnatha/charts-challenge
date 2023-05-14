import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';
import { palette, spacing } from '../../packages/theme';

export type SkeletonProps = {
  circle?: boolean;
  width: string;
  height: string;
};

const StyledSkeleton = styled(Skeleton)({
  marginTop: spacing(5),
});

export default function LoadingSkeleton({ circle, width, height }: SkeletonProps) {
  return (
    <StyledSkeleton
      {...(circle && { circle })}
      width={width}
      height={height}
      highlightColor={palette.lightGrey2}
      containerTestId="loading-skeleton"
    />
  );
}
