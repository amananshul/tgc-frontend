import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Calendar, MapPin, DollarSign } from 'lucide-react-native';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

interface GigCardProps {
  title: string;
  organizer: string;
  date: string;
  location: string;
  image: string;
  payout?: number;
  karmaPoints: number;
  category: string;
  participants: number;
  onPress: () => void;
}

export default function GigCard({
  title,
  organizer,
  date,
  location,
  image,
  payout,
  karmaPoints,
  category,
  participants,
  onPress,
}: GigCardProps) {
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
        {payout && (
          <View style={styles.payoutBadge}>
            <DollarSign size={12} color={Colors.success[700]} />
            <Text style={styles.payoutText}>{payout}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.organizer}>by {organizer}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={Colors.neutral[500]} />
            <Text style={styles.detailText}>{date}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MapPin size={16} color={Colors.neutral[500]} />
            <Text style={styles.detailText}>{location}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.karmaContainer}>
            <View style={styles.karmaPointsBadge}>
              <Text style={styles.karmaPointsText}>+{karmaPoints}</Text>
            </View>
            <Text style={styles.karmaLabel}>Karma</Text>
          </View>
          
          <Text style={styles.participants}>{participants} joined</Text>
        </View>
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
    height: 160,
  },
  badgeContainer: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
  },
  payoutBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success[100],
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: 16,
    marginLeft: Spacing.xs,
  },
  payoutText: {
    ...Typography.caption,
    fontFamily: 'Poppins-Medium',
    color: Colors.success[700],
    marginLeft: 2,
  },
  content: {
    padding: Spacing.md,
  },
  title: {
    ...Typography.subtitle1,
    color: Colors.neutral[800],
  },
  organizer: {
    ...Typography.caption,
    color: Colors.neutral[500],
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  karmaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  karmaPointsBadge: {
    backgroundColor: Colors.accent[100],
    paddingVertical: 2,
    paddingHorizontal: Spacing.xs,
    borderRadius: 4,
  },
  karmaPointsText: {
    ...Typography.caption,
    fontFamily: 'Poppins-Medium',
    color: Colors.accent[700],
  },
  karmaLabel: {
    ...Typography.caption,
    color: Colors.neutral[500],
    marginLeft: Spacing.xs,
  },
  participants: {
    ...Typography.caption,
    color: Colors.neutral[500],
  },
});