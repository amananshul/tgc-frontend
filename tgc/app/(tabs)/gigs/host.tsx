import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Upload, MapPin, Calendar, Clock, DollarSign } from 'lucide-react-native';
import Button from '@/components/common/Button';
import InputField from '@/components/auth/InputField';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

const types = ['Event', 'Class', 'Job'];
const skills = ['Photography', 'Music', 'Design', 'Teaching', 'Tech'];

export default function HostGigScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Event');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [fee, setFee] = useState('');
  const [payout, setPayout] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handlePublish = () => {
    // Handle publishing logic here
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.neutral[700]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Host a Gig</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.imageUpload}>
        <Upload size={32} color={Colors.neutral[400]} />
        <Text style={styles.uploadText}>Upload Banner Image</Text>
      </View>

      <View style={styles.form}>
        <InputField
          label="Title"
          placeholder="Give your gig a catchy title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Type</Text>
        <View style={styles.typeContainer}>
          {types.map(t => (
            <TouchableOpacity
              key={t}
              style={[
                styles.typeButton,
                type === t && styles.selectedType
              ]}
              onPress={() => setType(t)}
            >
              <Text style={[
                styles.typeText,
                type === t && styles.selectedTypeText
              ]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <InputField
              label="Date"
              placeholder="Select date"
              value={date}
              onChangeText={setDate}
              leftIcon={<Calendar size={20} color={Colors.neutral[500]} />}
            />
          </View>
          <View style={styles.halfInput}>
            <InputField
              label="Time"
              placeholder="Select time"
              value={time}
              onChangeText={setTime}
              leftIcon={<Clock size={20} color={Colors.neutral[500]} />}
            />
          </View>
        </View>

        <InputField
          label="Location"
          placeholder="Add location or 'Online'"
          value={location}
          onChangeText={setLocation}
          leftIcon={<MapPin size={20} color={Colors.neutral[500]} />}
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <InputField
              label="Entry Fee (Optional)"
              placeholder="$0"
              value={fee}
              onChangeText={setFee}
              keyboardType="numeric"
              leftIcon={<DollarSign size={20} color={Colors.neutral[500]} />}
            />
          </View>
          <View style={styles.halfInput}>
            <InputField
              label="Payout"
              placeholder="$0"
              value={payout}
              onChangeText={setPayout}
              keyboardType="numeric"
              leftIcon={<DollarSign size={20} color={Colors.neutral[500]} />}
            />
          </View>
        </View>

        <Text style={styles.label}>Required Skills</Text>
        <View style={styles.skillsContainer}>
          {skills.map(skill => (
            <TouchableOpacity
              key={skill}
              style={[
                styles.skillButton,
                selectedSkills.includes(skill) && styles.selectedSkill
              ]}
              onPress={() => toggleSkill(skill)}
            >
              <Text style={[
                styles.skillText,
                selectedSkills.includes(skill) && styles.selectedSkillText
              ]}>
                {skill}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Describe your gig in detail..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          placeholderTextColor={Colors.neutral[400]}
        />

        <Button
          title="Preview & Publish"
          onPress={handlePublish}
          fullWidth
          style={styles.publishButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  headerTitle: {
    ...Typography.h4,
    color: Colors.neutral[800],
  },
  imageUpload: {
    height: 200,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  uploadText: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginTop: Spacing.sm,
  },
  form: {
    padding: Spacing.lg,
  },
  label: {
    ...Typography.subtitle2,
    color: Colors.neutral[700],
    marginBottom: Spacing.xs,
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  typeButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    marginRight: Spacing.xs,
  },
  selectedType: {
    backgroundColor: Colors.primary[500],
  },
  typeText: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  selectedTypeText: {
    color: Colors.light.background,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.lg,
  },
  skillButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  selectedSkill: {
    backgroundColor: Colors.primary[500],
  },
  skillText: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  selectedSkillText: {
    color: Colors.light.background,
  },
  descriptionInput: {
    ...Typography.body1,
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    minHeight: 120,
  },
  publishButton: {
    marginBottom: Platform.OS === 'ios' ? 50 : 20,
  },
});