// src/components/InputFields.tsx

import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Controller, Control } from 'react-hook-form'
import { Colors } from '@/constants/Colors'

type Props = {
  label: string
  name: string
  control: Control<any>
  rules?: object
  secureTextEntry?: boolean
  placeholder?: string
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

const InputFields = ({
  label,
  name,
  control,
  rules = {},
  secureTextEntry,
  placeholder,
  keyboardType,
  autoCapitalize = 'none'
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[
                styles.inputField,
                error && { borderColor: 'red' }
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              placeholderTextColor={Colors.gray}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
            />
            {error && <Text style={styles.error}>{error.message || 'Campo requerido'}</Text>}
          </>
        )}
      />
    </View>
  )
}

export default InputFields

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginBottom: 20
  },
  label: {
    marginBottom: 5,
    color: Colors.black,
    fontSize: 14,
    fontWeight: '500'
  },
  inputField: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 19,
    borderRadius: 5,
    fontSize: 16,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gray
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4
  }
})
