import type { CSSObject } from 'styled-components';

export type Typography = {
  lg: {
    regular: CSSObject;
    bold: CSSObject;
  };
  md: {
    regular: CSSObject;
    bold: CSSObject;
  };
  sm: {
    regular: CSSObject;
    bold: CSSObject;
  };
};

const baseTextFontCSS: { regular: CSSObject; bold: CSSObject } = {
  regular: {
    fontWeight: 400,
  },
  bold: {
    fontWeight: 400,
  },
};

export const typography: Typography = {
  lg: {
    regular: {
      ...baseTextFontCSS.regular,
      fontSize: '1.8rem',
      lineHeight: '2.8rem',
    },
    bold: {
      ...baseTextFontCSS.bold,
      fontSize: '1.8rem',
      lineHeight: '2.8rem',
    },
  },
  md: {
    regular: {
      ...baseTextFontCSS.regular,
      fontSize: '1.6rem',
      lineHeight: '2.4rem',
    },
    bold: {
      ...baseTextFontCSS.bold,
      fontSize: '1.6rem',
      lineHeight: '2.4rem',
    },
  },
  sm: {
    regular: {
      ...baseTextFontCSS.regular,
      fontSize: '1.4rem',
      lineHeight: '2rem',
    },
    bold: {
      ...baseTextFontCSS.bold,
      fontSize: '1.4rem',
      lineHeight: '2rem',
    },
  },
};
