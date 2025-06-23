import { TextStyle } from 'react-native';

type TypographyStyles = {
  [key: string]: TextStyle;
};

const typography: TypographyStyles = {
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0.2,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  h3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  h4: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  subtitle1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  body1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  body2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  button: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  overline: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
};

export default typography;