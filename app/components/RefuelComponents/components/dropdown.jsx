// components/Dropdown.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

export default function Dropdown({ label, options = [], selectedValue, onSelect }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (item) => {
    onSelect(item);
    setShowOptions(false);
  };

  return (
    <View className="mb-4">
      {label && <Text className="text-gray-700 mb-1">{label}</Text>}

      {/* Dropdown Button */}
      <TouchableOpacity
        onPress={() => setShowOptions(!showOptions)}
        className="border border-gray-300 rounded-md p-3 bg-white"
      >
        <Text className={`${selectedValue ? 'text-black' : 'text-gray-400'}`}>
          {selectedValue?.label || '-- Select --'}
        </Text>
      </TouchableOpacity>

      {/* Options List */}
      {showOptions && (
        <View className="border border-gray-300 rounded-md mt-1 bg-white max-h-48">
          <FlatList
            data={options}
            keyExtractor={(item) => item.value.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                className="p-3 border-b border-gray-100"
              >
                <Text className="text-black">{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
