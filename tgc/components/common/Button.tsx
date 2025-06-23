import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const getContainerStyle = () => {
    const variantStyle = {
      primary: styles.primaryContainer,
      secondary: styles.secondaryContainer,
      outline: styles.outlineContainer,
      text: styles.textContainer,
    }[variant];

    const sizeStyle = {
      small: styles.smallContainer,
      medium: styles.mediumContainer,
      large: styles.largeContainer,
    }[size];

    const widthStyle = fullWidth ? styles.fullWidth : {};

    return [styles.container, variantStyle, sizeStyle, widthStyle, style];
  };

  const getTextStyle = () => {
    const variantTextStyle = {
      primary: styles.primaryText,
      secondary: styles.secondaryText,
      outline: styles.outlineText,
      text: styles.textOnly,
    }[variant];

    const sizeTextStyle = {
      small: styles.smallText,
      medium: styles.mediumText,
      large: styles.largeText,
    }[size];

    return [styles.text, variantTextStyle, sizeTextStyle, textStyle];
  };

  return (
    <TouchableOpacity
      style={getContainerStyle()}
      disabled={loading || props.disabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? 'white' : Colors.primary[500]} 
          size="small" 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryContainer: {
    backgroundColor: Colors.primary[500],
  },
  secondaryContainer: {
    backgroundColor: Colors.secondary[500],
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  textContainer: {
    backgroundColor: 'transparent',
  },
  smallContainer: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    minHeight: 32,
  },
  mediumContainer: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    minHeight: 44,
  },
  largeContainer: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    ...Typography.button,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: Colors.primary[500],
  },
  textOnly: {
    color: Colors.primary[500],
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});