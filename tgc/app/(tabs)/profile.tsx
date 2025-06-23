import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Settings, Award, CreditCard as Edit, Share2, BookOpen, Briefcase, Mic, LogOut } from 'lucide-react-native';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

const skills = ['Music', 'Photography', 'Writing'];
const interests = ['Design', 'Fitness', 'Cooking'];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Settings size={24} color={Colors.neutral[700]} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>D</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Devam Shah</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>New York, USA</Text>
            </View>

            <View style={styles.badgesContainer}>
              <Badge label="LEARNER" variant="primary" size="small" />
              <Badge label="GIGGER" variant="accent" size="small" />
              <Badge label="HOST" variant="secondary" size="small" />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>320</Text>
                <Text style={styles.statLabel}>Karma</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>24</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>
              Passionate musician and photographer looking to learn new skills and connect with creative people. 
              Currently exploring opportunities in event photography.
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.profileButton}>
              <Edit size={16} color={Colors.primary[600]} />
              <Text style={styles.profileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <Share2 size={16} color={Colors.primary[600]} />
              <Text style={styles.profileButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Award size={20} color={Colors.accent[500]} />
              <Text style={styles.sectionTitle}>Skills & Interests</Text>
            </View>
          </View>

          <View style={styles.skillsContainer}>
            <Text style={styles.skillsLabel}>Skills</Text>
            <View style={styles.skillsList}>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.skillsContainer}>
            <Text style={styles.skillsLabel}>Interests</Text>
            <View style={styles.skillsList}>
              {interests.map((interest, index) => (
                <View key={index} style={[styles.skillItem, styles.interestItem]}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        <View style={styles.activitiesSection}>
          <Text style={styles.activitiesSectionTitle}>My Activities</Text>

          <TouchableOpacity style={styles.activityCard}>
            <View style={[styles.activityIconContainer, { backgroundColor: Colors.primary[100] }]}>
              <BookOpen size={24} color={Colors.primary[600]} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Learning</Text>
              <Text style={styles.activitySubtitle}>3 Courses in Progress</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activityCard}>
            <View style={[styles.activityIconContainer, { backgroundColor: Colors.accent[100] }]}>
              <Briefcase size={24} color={Colors.accent[600]} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>My Gigs</Text>
              <Text style={styles.activitySubtitle}>2 Completed, 1 Upcoming</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activityCard}>
            <View style={[styles.activityIconContainer, { backgroundColor: Colors.secondary[100] }]}>
              <Mic size={24} color={Colors.secondary[600]} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Hosted Events</Text>
              <Text style={styles.activitySubtitle}>1 Event Hosted</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={Colors.error[500]} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    ...Typography.h3,
    color: Colors.neutral[800],
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    ...Typography.h1,
    color: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    ...Typography.h3,
    color: Colors.neutral[800],
    marginBottom: Spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  locationText: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  badgesContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    gap: Spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h4,
    color: Colors.neutral[800],
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.neutral[500],
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.neutral[200],
  },
  bioContainer: {
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  bioText: {
    ...Typography.body2,
    color: Colors.neutral[700],
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: Spacing.md,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  profileButtonText: {
    ...Typography.button,
    color: Colors.primary[600],
    marginLeft: Spacing.xs,
  },
  sectionCard: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Typography.subtitle1,
    color: Colors.neutral[800],
    marginLeft: Spacing.xs,
  },
  skillsContainer: {
    marginBottom: Spacing.md,
  },
  skillsLabel: {
    ...Typography.subtitle2,
    color: Colors.neutral[700],
    marginBottom: Spacing.xs,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    backgroundColor: Colors.primary[100],
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: 16,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  skillText: {
    ...Typography.caption,
    color: Colors.primary[700],
  },
  interestItem: {
    backgroundColor: Colors.secondary[100],
  },
  interestText: {
    ...Typography.caption,
    color: Colors.secondary[700],
  },
  activitiesSection: {
    marginBottom: Spacing.xl,
  },
  activitiesSectionTitle: {
    ...Typography.subtitle1,
    color: Colors.neutral[800],
    marginBottom: Spacing.md,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    ...Typography.subtitle1,
    color: Colors.neutral[800],
  },
  activitySubtitle: {
    ...Typography.body2,
    color: Colors.neutral[500],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxxl,
  },
  logoutText: {
    ...Typography.button,
    color: Colors.error[500],
    marginLeft: Spacing.xs,
  },
});