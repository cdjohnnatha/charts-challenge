import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { palette } from '../../packages/theme';

type SkeletonProps = {
  circle?: boolean;
  width: string;
  height: string;
};

export default function LoadingSkeleton({ circle, width, height }: SkeletonProps) {
  return (
    <Skeleton
      {...(circle && { circle })}
      width={width}
      height={height}
      highlightColor={palette.lightGrey2}
      containerTestId="loading-skeleton"
    />
  );
}
