import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'small' | 'medium' | 'large';
}

export default function Badge({
  label,
  variant = 'primary',
  size = 'medium',
}: BadgeProps) {
  const getContainerStyle = () => {
    const variantStyle = {
      primary: styles.primaryContainer,
      secondary: styles.secondaryContainer,
      accent: styles.accentContainer,
      success: styles.successContainer,
      warning: styles.warningContainer,
      error: styles.errorContainer,
    }[variant];

    const sizeStyle = {
      small: styles.smallContainer,
      medium: styles.mediumContainer,
      large: styles.largeContainer,
    }[size];

    return [styles.container, variantStyle, sizeStyle];
  };

  const getTextStyle = () => {
    const variantTextStyle = {
      primary: styles.primaryText,
      secondary: styles.secondaryText,
      accent: styles.accentText,
      success: styles.successText,
      warning: styles.warningText,
      error: styles.errorText,
    }[variant];

    const sizeTextStyle = {
      small: styles.smallText,
      medium: styles.mediumText,
      large: styles.largeText,
    }[size];

    return [styles.text, variantTextStyle, sizeTextStyle];
  };

  return (
    <View style={getContainerStyle()}>
      <Text style={getTextStyle()}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryContainer: {
    backgroundColor: Colors.primary[100],
  },
  secondaryContainer: {
    backgroundColor: Colors.secondary[100],
  },
  accentContainer: {
    backgroundColor: Colors.accent[100],
  },
  successContainer: {
    backgroundColor: Colors.success[100],
  },
  warningContainer: {
    backgroundColor: Colors.warning[100],
  },
  errorContainer: {
    backgroundColor: Colors.error[100],
  },
  smallContainer: {
    paddingVertical: Spacing.xs / 2,
    paddingHorizontal: Spacing.sm,
  },
  mediumContainer: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  largeContainer: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  text: {
    ...Typography.caption,
    fontFamily: 'Poppins-Medium',
  },
  primaryText: {
    color: Colors.primary[700],
  },
  secondaryText: {
    color: Colors.secondary[700],
  },
  accentText: {
    color: Colors.accent[700],
  },
  successText: {
    color: Colors.success[700],
  },
  warningText: {
    color: Colors.warning[700],
  },
  errorText: {
    color: Colors.error[700],
  },
  smallText: {
    fontSize: 10,
    lineHeight: 14,
  },
  mediumText: {
    fontSize: 12,
    lineHeight: 16,
  },
  largeText: {
    fontSize: 14,
    lineHeight: 18,
  },
});