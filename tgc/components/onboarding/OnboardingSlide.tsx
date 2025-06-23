import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

interface OnboardingSlideProps {
  title: string;
  description: string;
  image: string;
}

export default function OnboardingSlide({
  title,
  description,
  image,
}: OnboardingSlideProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={{ uri: image }}
        style={[styles.image, { width: width * 0.8, height: width * 0.8 * 0.75 }]}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  image: {
    marginBottom: Spacing.xl,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    ...Typography.h2,
    color: Colors.primary[700],
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.body1,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
});