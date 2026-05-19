 import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  label?: string;
};

export default function InputField({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  label,
}: Props) {
  return (
    <View style={styles.container}>

      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
        placeholderTextColor="#94a3b8"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },

  label: {
    marginBottom: 5,
    color: '#0f172a',
    fontWeight: '600',
  },

  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});