import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Calendar as CalendarIcon, List, Clock } from 'lucide-react-native';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

type ViewMode = 'list' | 'calendar';
type TimeFrame = 'upcoming' | 'past';

interface ScheduleItem {
  id: string;
  title: string;
  type: 'gig' | 'event' | 'course';
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const scheduleData: ScheduleItem[] = [
  {
    id: '1',
    title: 'Guitar Workshop',
    type: 'course',
    date: 'Today',
    time: '2:00 PM - 4:00 PM',
    location: 'Music Studio, New York',
    status: 'confirmed',
  },
  {
    id: '2',
    title: 'Photography Gig',
    type: 'gig',
    date: 'Tomorrow',
    time: '10:00 AM - 1:00 PM',
    location: 'Central Park, New York',
    status: 'confirmed',
  },
  {
    id: '3',
    title: 'Yoga in the Park',
    type: 'event',
    date: 'May 20, 2025',
    time: '9:00 AM - 10:30 AM',
    location: 'Brooklyn Park, New York',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Digital Marketing Webinar',
    type: 'course',
    date: 'May 25, 2025',
    time: '6:00 PM - 8:00 PM',
    location: 'Online',
    status: 'confirmed',
  },
];

export default function ScheduleScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('upcoming');

  const getStatusColor = (status: string) => {
    return status === 'confirmed'
      ? Colors.success[500]
      : status === 'pending'
      ? Colors.warning[500]
      : Colors.neutral[500];
  };

  const getTypeColor = (type: string) => {
    return type === 'gig'
      ? Colors.accent[500]
      : type === 'event'
      ? Colors.secondary[500]
      : Colors.primary[500];
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Schedule</Text>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === 'list' && styles.activeViewToggleButton,
              ]}
              onPress={() => setViewMode('list')}
            >
              <List
                size={20}
                color={viewMode === 'list' ? Colors.light.background : Colors.neutral[600]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === 'calendar' && styles.activeViewToggleButton,
              ]}
              onPress={() => setViewMode('calendar')}
            >
              <CalendarIcon
                size={20}
                color={viewMode === 'calendar' ? Colors.light.background : Colors.neutral[600]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.timeFrameToggle}>
          <TouchableOpacity
            style={[
              styles.timeFrameButton,
              timeFrame === 'upcoming' && styles.activeTimeFrameButton,
            ]}
            onPress={() => setTimeFrame('upcoming')}
          >
            <Text
              style={[
                styles.timeFrameText,
                timeFrame === 'upcoming' && styles.activeTimeFrameText,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeFrameButton,
              timeFrame === 'past' && styles.activeTimeFrameButton,
            ]}
            onPress={() => setTimeFrame('past')}
          >
            <Text
              style={[
                styles.timeFrameText,
                timeFrame === 'past' && styles.activeTimeFrameText,
              ]}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {viewMode === 'list' ? (
          <ScrollView style={styles.scrollView}>
            {scheduleData.map((item) => (
              <Card key={item.id} style={styles.scheduleCard} onPress={() => {}}>
                <View style={styles.scheduleCardHeader}>
                  <Badge
                    label={item.type.toUpperCase()}
                    variant={
                      item.type === 'gig'
                        ? 'accent'
                        : item.type === 'event'
                        ? 'secondary'
                        : 'primary'
                    }
                    size="small"
                  />
                  <Badge
                    label={item.status.toUpperCase()}
                    variant={
                      item.status === 'confirmed'
                        ? 'success'
                        : item.status === 'pending'
                        ? 'warning'
                        : 'error'
                    }
                    size="small"
                  />
                </View>
                <Text style={styles.scheduleCardTitle}>{item.title}</Text>
                <View style={styles.scheduleCardDetail}>
                  <CalendarIcon size={16} color={Colors.neutral[500]} />
                  <Text style={styles.scheduleCardDetailText}>{item.date}</Text>
                </View>
                <View style={styles.scheduleCardDetail}>
                  <Clock size={16} color={Colors.neutral[500]} />
                  <Text style={styles.scheduleCardDetailText}>{item.time}</Text>
                </View>
                <View style={styles.scheduleCardButtonsContainer}>
                  <TouchableOpacity
                    style={[styles.scheduleCardButton, { backgroundColor: getTypeColor(item.type) }]}
                  >
                    <Text style={styles.scheduleCardButtonText}>Details</Text>
                  </TouchableOpacity>
                  {item.status === 'confirmed' && (
                    <TouchableOpacity style={styles.scheduleCardOutlineButton}>
                      <Text style={[styles.scheduleCardOutlineButtonText, { color: getTypeColor(item.type) }]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Card>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.calendarPlaceholder}>
            <Text style={styles.placeholderText}>Calendar view coming soon!</Text>
          </View>
        )}
      </View>
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
  title: {
    ...Typography.h3,
    color: Colors.neutral[800],
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    overflow: 'hidden',
  },
  viewToggleButton: {
    padding: Spacing.sm,
    width: 40,
    alignItems: 'center',
  },
  activeViewToggleButton: {
    backgroundColor: Colors.primary[500],
  },
  timeFrameToggle: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  timeFrameButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginRight: Spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTimeFrameButton: {
    borderBottomColor: Colors.primary[500],
  },
  timeFrameText: {
    ...Typography.subtitle2,
    color: Colors.neutral[500],
  },
  activeTimeFrameText: {
    color: Colors.primary[600],
  },
  scrollView: {
    flex: 1,
  },
  scheduleCard: {
    marginBottom: Spacing.md,
  },
  scheduleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  scheduleCardTitle: {
    ...Typography.subtitle1,
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
  },
  scheduleCardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  scheduleCardDetailText: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginLeft: Spacing.xs,
  },
  scheduleCardButtonsContainer: {
    flexDirection: 'row',
    marginTop: Spacing.md,
  },
  scheduleCardButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    marginRight: Spacing.sm,
  },
  scheduleCardButtonText: {
    ...Typography.button,
    fontSize: 12,
    color: Colors.light.background,
  },
  scheduleCardOutlineButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
  },
  scheduleCardOutlineButtonText: {
    ...Typography.button,
    fontSize: 12,
  },
  calendarPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    ...Typography.subtitle1,
    color: Colors.neutral[500],
  },
});