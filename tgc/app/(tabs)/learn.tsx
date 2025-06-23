import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, Filter } from 'lucide-react-native';
import CourseCard from '@/components/skills/CourseCard';
import Badge from '@/components/common/Badge';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

const categories = [
  'All', 'Music', 'Fitness', 'Business', 'DIY', 'Mental Health', 'Cooking', 'Tech'
];

export default function LearnScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Learn New Skills</Text>
          <Text style={styles.subtitle}>Discover courses, workshops, and mentors</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.neutral[500]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for skills, courses..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={Colors.neutral[400]}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={Colors.neutral[700]} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScrollView}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Now</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>

        <CourseCard
          title="Guitar Fundamentals - Live Session"
          instructor="James Wilson"
          duration="60 mins"
          image="https://images.pexels.com/photos/1656066/pexels-photo-1656066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          category="Music"
          isLive={true}
          onPress={() => {}}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>

        <CourseCard
          title="Intro to Digital Marketing"
          instructor="Sarah Johnson"
          duration="4 hours"
          image="https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          category="Business"
          isLive={false}
          onPress={() => {}}
        />

        <CourseCard
          title="Mindfulness Meditation"
          instructor="David Chen"
          duration="2 hours"
          image="https://images.pexels.com/photos/6603950/pexels-photo-6603950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          category="Mental Health"
          isLive={false}
          onPress={() => {}}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Learning Path</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>

        <CourseCard
          title="Photography Basics"
          instructor="Michael Andrews"
          duration="6 hours"
          image="https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          category="DIY"
          isLive={false}
          progress={45}
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h3,
    color: Colors.neutral[800],
  },
  subtitle: {
    ...Typography.body1,
    color: Colors.neutral[600],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginRight: Spacing.sm,
  },
  searchInput: {
    ...Typography.body1,
    flex: 1,
    color: Colors.neutral[800],
    marginLeft: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesScrollView: {
    marginBottom: Spacing.lg,
  },
  categoriesContainer: {
    paddingRight: Spacing.lg,
  },
  categoryButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    marginRight: Spacing.xs,
  },
  selectedCategory: {
    backgroundColor: Colors.primary[500],
  },
  categoryText: {
    ...Typography.body2,
    color: Colors.neutral[700],
  },
  selectedCategoryText: {
    color: Colors.light.background,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.subtitle1,
    color: Colors.neutral[800],
  },
  seeAllButton: {
    ...Typography.body2,
    color: Colors.primary[600],
  },
});