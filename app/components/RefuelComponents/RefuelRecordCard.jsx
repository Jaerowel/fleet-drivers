import React from 'react';
import { View, Text } from 'react-native';

export default function RefuelRecordCard({ record }) {
  const totalCost = (record.quantity * record.cost_per_unit).toFixed(2);

  return (
    <View className="mb-4 p-4 bg-white rounded-lg shadow">
      <Text className="text-lg font-semibold text-gray-800">{record.fleetName}</Text>
      <Text className="text-sm text-gray-600">Fuel Type: {record.fuel_type}</Text>
      <Text className="text-sm text-gray-600">Date: {record.date}</Text>
      <Text className="text-sm text-gray-600">Quantity: {record.quantity} L</Text>
      <Text className="text-sm text-gray-600">Cost per Unit: ${record.cost_per_unit}</Text>
      <Text className="text-sm text-gray-800 font-bold">Total Cost: ${totalCost}</Text>
    </View>
  );
}
