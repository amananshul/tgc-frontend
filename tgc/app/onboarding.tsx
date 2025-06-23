import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, Animated } from 'react-native';
import { router } from 'expo-router';
import OnboardingSlide from '@/components/onboarding/OnboardingSlide';
import Button from '@/components/common/Button';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

const slides = [
  {
    id: '1',
    title: 'Learn skills, earn gigs, build community',
    description: 'Discover new skills from expert instructors and find gigs that match your talents.',
    image: 'https://images.pexels.com/photos/7439141/pexels-photo-7439141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    title: 'Host events, discover peers, get karma points',
    description: 'Create your own events, connect with like-minded people, and earn karma as you contribute.',
    image: 'https://images.pexels.com/photos/8448811/pexels-photo-8448811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    title: 'Grow with purpose — Let\'s Gig Together',
    description: 'Join a community that helps you develop skills while making meaningful connections.',
    image: 'https://images.pexels.com/photos/6325984/pexels-photo-6325984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = (index: number) => {
    if (slidesRef.current) {
      slidesRef.current.scrollToIndex({ index });
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollTo(currentIndex + 1);
    } else {
      router.replace('/auth');
    }
  };

  const handleSkip = () => {
    router.replace('/auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.skipContainer}>
        <Button 
          title="Skip" 
          variant="text" 
          size="small"
          onPress={handleSkip}
          style={styles.skipButton}
        />
      </View>

      <Animated.FlatList
        ref={slidesRef}
        data={slides}
        renderItem={({ item }) => (
          <OnboardingSlide
            title={item.title}
            description={item.description}
            image={item.image}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        style={{ flex: 1 }}
      />

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });
            
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            
            return (
              <Animated.View
                key={`indicator-${i}`}
                style={[
                  styles.indicator,
                  { width: dotWidth, opacity },
                ]}
              />
            );
          })}
        </View>

        <Button
          title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          onPress={handleNext}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  skipContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 999,
  },
  skipButton: {
    paddingHorizontal: Spacing.md,
  },
  footer: {
    padding: Spacing.xl,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  indicator: {
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary[500],
    marginHorizontal: 5,
  },
});