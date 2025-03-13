import React from 'react';
import { TextInput, View } from 'react-native';

export default function CustomTextInput({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  className = '',
  ...props
}) {
  return (
    <View className={`border border-gray-300 rounded-md ${className}`}>
      <TextInput
        className="p-2 text-gray-800"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        {...props}
      />
    </View>
  );
}
