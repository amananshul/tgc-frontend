import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';
import { 
  BookOpen, 
  Briefcase, 
  Mic, 
  Heart, 
  Users, 
  Plus 
} from 'lucide-react-native';
import KarmaPointsCard from '@/components/home/KarmaPointsCard';
import DashboardCard from '@/components/home/DashboardCard';
import GigCard from '@/components/gigs/GigCard';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hey Devam,</Text>
            <Text style={styles.subtitle}>Ready to gig?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>D</Text>
            </View>
          </TouchableOpacity>
        </View>

        <KarmaPointsCard points={320} level="Gigger" joinedEvents={5} />

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <DashboardCard
            title="Learn New Skills"
            description="Explore courses & workshops"
            icon={<BookOpen size={24} color={Colors.primary[600]} />}
            onPress={() => {}}
            color={Colors.primary[500]}
          />
          
          <DashboardCard
            title="Find Gigs"
            description="Jobs and events near you"
            icon={<Briefcase size={24} color={Colors.secondary[600]} />}
            onPress={() => {}}
            color={Colors.secondary[500]}
          />
          
          <DashboardCard
            title="Host Event"
            description="Share your knowledge"
            icon={<Mic size={24} color={Colors.accent[600]} />}
            onPress={() => {}}
            color={Colors.accent[500]}
          />
          
          <DashboardCard
            title="Volunteer Near You"
            description="Help your community"
            icon={<Heart size={24} color={Colors.error[600]} />}
            onPress={() => {}}
            color={Colors.error[500]}
          />
          
          <DashboardCard
            title="Explore Communities"
            description="Connect with peers"
            icon={<Users size={24} color={Colors.success[600]} />}
            onPress={() => {}}
            color={Colors.success[500]}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Gigs</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          <GigCard
            title="Music Production Workshop"
            organizer="DJ MixMaster"
            date="Thu, May 15 • 2:00 PM"
            location="Studio 54, New York"
            image="https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            payout={25}
            karmaPoints={50}
            category="Music"
            participants={12}
            onPress={() => {}}
          />
          <GigCard
            title="Yoga in the Park"
            organizer="Zen Wellness"
            date="Sat, May 17 • 9:00 AM"
            location="Central Park, New York"
            image="https://images.pexels.com/photos/1375883/pexels-photo-1375883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            karmaPoints={30}
            category="Fitness"
            participants={24}
            onPress={() => {}}
          />
        </ScrollView>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  greeting: {
    ...Typography.h3,
    color: Colors.neutral[800],
  },
  subtitle: {
    ...Typography.body1,
    color: Colors.neutral[600],
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    ...Typography.h3,
    color: '#FFFFFF',
  },
  sectionTitle: {
    ...Typography.subtitle1,
    color: Colors.neutral[800],
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  actionsContainer: {
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  seeAllButton: {
    ...Typography.body2,
    color: Colors.primary[600],
  },
  horizontalScrollContent: {
    paddingRight: Spacing.lg,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
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