import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Dropdown from './components/dropdown';

export default function NewRefuelForm({ fleets, fuelTypes, onSave, onCancel }) {
  const [selectedFleet, setSelectedFleet] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');

  const handleSave = () => {
    if (!selectedFleet || !selectedFuelType || !quantity || !cost) {
      alert('Please fill out all fields.');
      return;
    }

    const newRecord = {
      vehicle: fleets.find((f) => f.id === selectedFleet)?.name || '',
      fuelType: fuelTypes.find((f) => f.id === selectedFuelType)?.name || '',
      quantity,
      cost,
      date: new Date().toISOString().split('T')[0],
    };

    onSave(newRecord);
  };

  return (
    <View className="space-y-4">
      <Dropdown
        label="Select Fleet"
        options={fleets.map((fleet) => ({
          label: fleet.name,
          value: fleet.id,
        }))}
        selectedValue={fleets.find((fleet) => fleet.id === selectedFleet)}
        onSelect={(item) => setSelectedFleet(item.value)}
      />

      <Dropdown
        label="Select Fuel Type"
        options={fuelTypes.map((type) => ({
          label: type.name,
          value: type.id,
        }))}
        selectedValue={fuelTypes.find((type) => type.id === selectedFuelType)}
        onSelect={(item) => setSelectedFuelType(item.value)}
      />

      <TextInput
        className="border border-gray-300 rounded-md p-3"
        placeholder="Quantity (e.g., 50L)"
        value={quantity}
        onChangeText={setQuantity}
      />

      <TextInput
        className="border border-gray-300 rounded-md p-3"
        placeholder="Cost (e.g., $100)"
        value={cost}
        onChangeText={setCost}
      />

      <View className="flex-row justify-between">
        <TouchableOpacity
          className="bg-gray-300 p-3 rounded-md flex-1 mr-2 items-center"
          onPress={onCancel}
        >
          <Text className="text-gray-700">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-indigo-600 p-3 rounded-md flex-1 ml-2 items-center"
          onPress={handleSave}
        >
          <Text className="text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
