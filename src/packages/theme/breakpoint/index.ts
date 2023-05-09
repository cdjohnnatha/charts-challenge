import { spacingFunction } from '../spacing';

export type Breakpoint = {
  value: number;
  mediaQuery: string;
  columns: number;
  gutter: string;
};
export type BreakpointKey = 'sm' | 'md';
export type Breakpoints = Record<BreakpointKey, Breakpoint>;

export const breakpoints: Breakpoints = {
  sm: {
    value: 768,
    mediaQuery: '@media (min-width: 768px)',
    columns: 6,
    gutter: spacingFunction(6),
  },
  md: {
    value: 1024,
    mediaQuery: '@media (min-width: 1024px)',
    columns: 12,
    gutter: spacingFunction(6),
  },
};
