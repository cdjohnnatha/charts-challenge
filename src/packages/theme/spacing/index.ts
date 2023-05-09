type SpacingValue = 'auto' | number;
type SpacingArgs = [SpacingValue, ...Array<SpacingValue>];
type SpacingFunction = (...spacingValues: SpacingArgs) => string;

export const factor = 0.4;

export const spacingFunction: SpacingFunction = function spacingFunction(...spacingValues): string {
  if (spacingValues.length > 4) throw new Error(`${spacingValues.length} arguments provided. Maximum 4 allowed.`);

  return spacingValues
    .reduce<Array<string>>((acc, curr) => {
      acc.push(typeof curr === 'number' ? `${parseFloat((curr * factor).toFixed(2))}rem` : curr);

      return acc;
    }, [])
    .join(' ');
};
