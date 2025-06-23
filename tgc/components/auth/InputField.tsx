import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
}

export default function InputField({
  label,
  error,
  leftIcon,
  isPassword = false,
  ...props
}: InputFieldProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : null,
          props.editable === false ? styles.inputDisabled : null,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            isPassword ? styles.inputWithRightIcon : null,
          ]}
          placeholderTextColor={Colors.neutral[400]}
          secureTextEntry={secureTextEntry}
          {...props}
        />
        {isPassword && (
          <View style={styles.rightIconContainer}>
            {secureTextEntry ? (
              <Eye
                size={20}
                color={Colors.neutral[500]}
                onPress={toggleSecureEntry}
              />
            ) : (
              <EyeOff
                size={20}
                color={Colors.neutral[500]}
                onPress={toggleSecureEntry}
              />
            )}
          </View>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.subtitle2,
    color: Colors.neutral[700],
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    backgroundColor: Colors.light.background,
  },
  inputError: {
    borderColor: Colors.error[500],
  },
  inputDisabled: {
    backgroundColor: Colors.neutral[100],
  },
  input: {
    ...Typography.body1,
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    color: Colors.neutral[800],
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  leftIconContainer: {
    paddingLeft: Spacing.md,
  },
  rightIconContainer: {
    paddingRight: Spacing.md,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error[500],
    marginTop: Spacing.xs,
  },
});