import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevation?: 'none' | 'low' | 'medium' | 'high';
}

export default function Card({
  children,
  style,
  onPress,
  elevation = 'low',
}: CardProps) {
  const cardElevation = {
    none: styles.noElevation,
    low: styles.lowElevation,
    medium: styles.mediumElevation,
    high: styles.highElevation,
  }[elevation];

  const CardComponent = onPress ? TouchableOpacity : View;
  const additionalProps = onPress ? { onPress, activeOpacity: 0.8 } : {};

  return (
    <CardComponent style={[styles.card, cardElevation, style]} {...additionalProps}>
      {children}
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
  },
  noElevation: {
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  lowElevation: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mediumElevation: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  highElevation: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
});