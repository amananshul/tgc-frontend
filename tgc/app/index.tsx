import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence,
  withDelay,
  runOnJS
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate logo
    opacity.value = withSequence(
      withTiming(1, { duration: 800 }),
      withDelay(1500, withTiming(1, { duration: 300 }))
    );
    
    scale.value = withSequence(
      withTiming(1, { duration: 800 }),
      withDelay(1500, withTiming(1.05, { duration: 300 }))
    );
    
    // Animate text
    textOpacity.value = withDelay(
      500, 
      withTiming(1, { duration: 800 })
    );

    // Navigate to onboarding after animation
    const timer = setTimeout(() => {
      navigateToOnboarding();
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const navigateToOnboarding = () => {
    router.replace('/onboarding');
  };

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [
        { translateY: withTiming(textOpacity.value * 20, { duration: 800 }) },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>TGC</Text>
        </View>
      </Animated.View>
      
      <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
        <Text style={styles.title}>The Gig Community</Text>
        <Text style={styles.tagline}>We make you socially productive</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    ...Typography.h1,
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    ...Typography.h2,
    color: Colors.primary[700],
    marginBottom: 8,
  },
  tagline: {
    ...Typography.subtitle1,
    color: Colors.neutral[600],
  },
});