import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Mail, Phone, Lock } from 'lucide-react-native';
import Button from '@/components/common/Button';
import InputField from '@/components/auth/InputField';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

type AuthMode = 'login' | 'signup';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [useEmail, setUseEmail] = useState(true);

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  const toggleAuthMethod = () => {
    setUseEmail(!useEmail);
  };

  const handleContinue = () => {
    if (mode === 'signup') {
      router.replace('/profile-setup');
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleGuestContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>TGC</Text>
        </View>
        <Text style={styles.title}>
          {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
        </Text>
        <Text style={styles.subtitle}>
          {mode === 'login' 
            ? 'Sign in to continue your social productivity journey'
            : 'Join the community of skilled individuals'}
        </Text>
      </View>

      <View style={styles.formContainer}>
        {useEmail ? (
          <InputField
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={Colors.neutral[500]} />}
          />
        ) : (
          <InputField
            label="Phone Number"
            placeholder="+1 (123) 456-7890"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            leftIcon={<Phone size={20} color={Colors.neutral[500]} />}
          />
        )}

        <InputField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          isPassword
          leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
        />

        {mode === 'signup' && (
          <InputField
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isPassword
            leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
          />
        )}

        <TouchableOpacity onPress={toggleAuthMethod} style={styles.switchMethod}>
          <Text style={styles.switchMethodText}>
            Use {useEmail ? 'phone number' : 'email'} instead
          </Text>
        </TouchableOpacity>

        {mode === 'login' && (
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        <Button
          title={mode === 'login' ? 'Login' : 'Sign Up'}
          onPress={handleContinue}
          fullWidth
          style={styles.submitButton}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <Button
          title="Continue with Google"
          variant="outline"
          fullWidth
          style={styles.googleButton}
        />

        {mode === 'login' && (
          <Button
            title="Continue as Guest"
            variant="text"
            fullWidth
            style={styles.guestButton}
            onPress={handleGuestContinue}
          />
        )}

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <TouchableOpacity onPress={toggleMode}>
            <Text style={styles.toggleButton}>
              {mode === 'login' ? 'Sign up' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  logoText: {
    ...Typography.h2,
    color: '#FFFFFF',
  },
  title: {
    ...Typography.h2,
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body1,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  switchMethod: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.md,
  },
  switchMethodText: {
    ...Typography.body2,
    color: Colors.primary[600],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.xl,
  },
  forgotPasswordText: {
    ...Typography.body2,
    color: Colors.primary[600],
  },
  submitButton: {
    marginBottom: Spacing.xl,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.neutral[200],
  },
  dividerText: {
    ...Typography.body2,
    color: Colors.neutral[500],
    marginHorizontal: Spacing.md,
  },
  googleButton: {
    marginBottom: Spacing.md,
  },
  guestButton: {
    marginBottom: Spacing.xl,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  toggleText: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  toggleButton: {
    ...Typography.body2,
    color: Colors.primary[600],
    fontFamily: 'Poppins-Medium',
  },
});