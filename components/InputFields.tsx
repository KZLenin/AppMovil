// src/components/InputFields.tsx

import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Controller, Control } from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons' // Importa Ionicons para el icono ojo
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
  secureTextEntry = false,
  placeholder,
  keyboardType,
  autoCapitalize = 'none'
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <View style={[styles.inputWrapper, error && { borderColor: 'red' }]}>
              <TextInput
                style={styles.inputField}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={Colors.gray}
                secureTextEntry={secureTextEntry && !showPassword}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
              />
              {secureTextEntry && (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.iconButton}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color={Colors.gray}
                  />
                </TouchableOpacity>
              )}
            </View>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingHorizontal: 10
  },
  inputField: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.black
  },
  iconButton: {
    paddingHorizontal: 6
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4
  }
})
