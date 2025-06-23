import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Award } from 'lucide-react-native';
import Card from '@/components/common/Card';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

interface KarmaPointsCardProps {
  points: number;
  level: string;
  joinedEvents: number;
}

export default function KarmaPointsCard({
  points,
  level,
  joinedEvents,
}: KarmaPointsCardProps) {
  // Calculate progress percentage (for demo purposes)
  const nextLevel = level === 'Beginner' ? 500 
    : level === 'Gigger' ? 1000 
    : level === 'Pro' ? 2000 
    : 5000;
  
  const progress = Math.min((points / nextLevel) * 100, 100);

  return (
    <Card elevation="medium" style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Karma</Text>
          <Award size={20} color={Colors.accent[500]} />
        </View>
        <Text style={styles.level}>{level}</Text>
      </View>

      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{points}</Text>
        <Text style={styles.pointsLabel}>karma points</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {nextLevel - points} points to next level
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{joinedEvents}</Text>
          <Text style={styles.statLabel}>Events Joined</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Skills Learned</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Gigs Completed</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...Typography.h4,
    color: Colors.neutral[800],
    marginRight: Spacing.xs,
  },
  level: {
    ...Typography.subtitle2,
    color: Colors.accent[500],
    backgroundColor: Colors.accent[50],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: 16,
  },
  pointsContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  points: {
    ...Typography.h1,
    color: Colors.primary[600],
    marginBottom: Spacing.xs / 2,
  },
  pointsLabel: {
    ...Typography.body2,
    color: Colors.neutral[500],
  },
  progressContainer: {
    marginBottom: Spacing.lg,
  },
  progressBackground: {
    height: 8,
    backgroundColor: Colors.neutral[200],
    borderRadius: 4,
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent[500],
    borderRadius: 4,
  },
  progressText: {
    ...Typography.caption,
    color: Colors.neutral[500],
    textAlign: 'right',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h3,
    color: Colors.neutral[800],
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.neutral[500],
  },
  divider: {
    width: 1,
    backgroundColor: Colors.neutral[200],
  },
});