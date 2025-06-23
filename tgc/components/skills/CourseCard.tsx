import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Clock, User } from 'lucide-react-native';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

interface CourseCardProps {
  title: string;
  instructor: string;
  duration: string;
  image: string;
  category: string;
  isLive: boolean;
  progress?: number;
  onPress: () => void;
}

export default function CourseCard({
  title,
  instructor,
  duration,
  image,
  category,
  isLive,
  progress,
  onPress,
}: CourseCardProps) {
  return (
    <Card onPress={onPress} elevation="medium" style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      
      <View style={styles.badgeContainer}>
        <Badge 
          label={category} 
          variant={
            category === 'Music' ? 'primary' : 
            category === 'Fitness' ? 'secondary' : 
            category === 'Business' ? 'success' : 'accent'
          } 
        />
        {isLive && <Badge label="LIVE" variant="error" style={styles.liveBadge} />}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <User size={16} color={Colors.neutral[500]} />
            <Text style={styles.detailText}>{instructor}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.neutral[500]} />
            <Text style={styles.detailText}>{duration}</Text>
          </View>
        </View>

        {progress !== undefined && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}% complete</Text>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
  },
  badgeContainer: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
  },
  liveBadge: {
    marginLeft: Spacing.xs,
  },
  content: {
    padding: Spacing.md,
  },
  title: {
    ...Typography.subtitle1,
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
  },
  detailsContainer: {
    marginBottom: Spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  detailText: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginLeft: Spacing.xs,
  },
  progressContainer: {
    marginTop: Spacing.xs,
  },
  progressBackground: {
    height: 4,
    backgroundColor: Colors.neutral[200],
    borderRadius: 2,
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary[500],
    borderRadius: 2,
  },
  progressText: {
    ...Typography.caption,
    color: Colors.neutral[500],
  },
});