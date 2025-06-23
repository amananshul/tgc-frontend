import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Camera, Upload } from 'lucide-react-native';
import Button from '@/components/common/Button';
import InputField from '@/components/auth/InputField';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

const roles = [
  { id: 'learner', label: 'Learner' },
  { id: 'host', label: 'Host' },
  { id: 'mentor', label: 'Mentor' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'gigger', label: 'Gigger' },
];

const skills = [
  { id: 'music', label: 'Music' },
  { id: 'design', label: 'Design' },
  { id: 'coding', label: 'Coding' },
  { id: 'cooking', label: 'Cooking' },
  { id: 'writing', label: 'Writing' },
  { id: 'photography', label: 'Photography' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'languages', label: 'Languages' },
];

export default function ProfileSetupScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleRole = (roleId: string) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter(id => id !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  const toggleSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const handleComplete = () => {
    router.replace('/(tabs)');
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Complete Your Profile</Text>
      <Text style={styles.subtitle}>Let's personalize your experience</Text>

      <View style={styles.profileImageContainer}>
        <View style={styles.profileImagePlaceholder}>
          <Upload size={32} color={Colors.neutral[400]} />
        </View>
        <View style={styles.cameraButton}>
          <Camera size={16} color="#FFFFFF" />
        </View>
        <Text style={styles.uploadText}>Upload Profile Picture</Text>
      </View>

      <View style={styles.formSection}>
        <InputField
          label="Full Name"
          placeholder="John Doe"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.rowInputs}>
          <View style={styles.halfInput}>
            <InputField
              label="Age"
              placeholder="25"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.halfInput}>
            <InputField
              label="Location"
              placeholder="City, Country"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Select Your Role(s)</Text>
          <Text style={styles.sectionSubtitle}>What best describes you?</Text>
          <View style={styles.optionsContainer}>
            {roles.map(role => (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.optionButton,
                  selectedRoles.includes(role.id) && styles.selectedOption
                ]}
                onPress={() => toggleRole(role.id)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    selectedRoles.includes(role.id) && styles.selectedOptionText
                  ]}
                >
                  {role.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Skills & Interests</Text>
          <Text style={styles.sectionSubtitle}>Select what you're good at or want to learn</Text>
          <View style={styles.optionsContainer}>
            {skills.map(skill => (
              <TouchableOpacity
                key={skill.id}
                style={[
                  styles.optionButton,
                  selectedSkills.includes(skill.id) && styles.selectedOption
                ]}
                onPress={() => toggleSkill(skill.id)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    selectedSkills.includes(skill.id) && styles.selectedOptionText
                  ]}
                >
                  {skill.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          title="Complete Setup"
          onPress={handleComplete}
          fullWidth
          style={styles.completeButton}
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
  contentContainer: {
    padding: Spacing.xl,
  },
  title: {
    ...Typography.h2,
    color: Colors.neutral[800],
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body1,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 24,
    right: 125,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    ...Typography.body2,
    color: Colors.primary[600],
    marginTop: Spacing.sm,
  },
  formSection: {
    width: '100%',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  sectionContainer: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.subtitle1,
    color: Colors.neutral[800],
  },
  sectionSubtitle: {
    ...Typography.body2,
    color: Colors.neutral[500],
    marginBottom: Spacing.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs / 2,
  },
  optionButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  selectedOption: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  optionText: {
    ...Typography.body2,
    color: Colors.neutral[700],
  },
  selectedOptionText: {
    color: Colors.light.background,
  },
  completeButton: {
    marginTop: Spacing.xl,
  },
});