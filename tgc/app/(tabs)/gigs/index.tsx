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
import { router } from 'expo-router';
import { Search, Filter, MapPin, Plus } from 'lucide-react-native';
import GigCard from '@/components/gigs/GigCard';
import Badge from '@/components/common/Badge';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

const categories = ['All', 'Music', 'Photography', 'Design', 'Teaching', 'Tech', 'Events'];
const tabs = ['Nearby', 'Online', 'Trending'];

const gigs = [
  {
    id: '1',
    title: 'Wedding Photography',
    organizer: 'Sarah Events',
    date: 'Sat, Jun 15 • 2:00 PM',
    location: 'Central Park, NY',
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    payout: 200,
    karmaPoints: 50,
    category: 'Photography',
    participants: 0,
    difficulty: 'Intermediate',
    type: 'Gig',
  },
  {
    id: '2',
    title: 'Guitar Workshop Host',
    organizer: 'Music Academy',
    date: 'Sun, Jun 16 • 3:00 PM',
    location: 'Online',
    image: 'https://images.pexels.com/photos/1656066/pexels-photo-1656066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    payout: 150,
    karmaPoints: 30,
    category: 'Music',
    participants: 2,
    difficulty: 'Expert',
    type: 'Event',
  },
];

export default function GigsScreen() {
  const [activeTab, setActiveTab] = useState('Nearby');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleHostGig = () => {
    router.push('/gigs/host');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Find Gigs & Events</Text>
          <Text style={styles.subtitle}>Discover opportunities near you</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.neutral[500]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search gigs, events..."
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
          style={styles.tabsContainer}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.locationContainer}>
          <MapPin size={16} color={Colors.neutral[500]} />
          <Text style={styles.locationText}>New York, NY</Text>
          <TouchableOpacity>
            <Text style={styles.changeLocation}>Change</Text>
          </TouchableOpacity>
        </View>

        {gigs.map(gig => (
          <GigCard
            key={gig.id}
            {...gig}
            onPress={() => router.push(`/gigs/${gig.id}`)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={handleHostGig}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  tabsContainer: {
    marginBottom: Spacing.md,
  },
  tab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginRight: Spacing.sm,
    borderRadius: 8,
    backgroundColor: Colors.neutral[100],
  },
  activeTab: {
    backgroundColor: Colors.primary[500],
  },
  tabText: {
    ...Typography.subtitle2,
    color: Colors.neutral[600],
  },
  activeTabText: {
    color: Colors.light.background,
  },
  categoriesContainer: {
    marginBottom: Spacing.md,
  },
  categoryButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    marginRight: Spacing.xs,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
  },
  selectedCategory: {
    backgroundColor: Colors.primary[500],
  },
  categoryText: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  selectedCategoryText: {
    color: Colors.light.background,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  locationText: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginLeft: Spacing.xs,
  },
  changeLocation: {
    ...Typography.body2,
    color: Colors.primary[600],
    marginLeft: Spacing.sm,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});