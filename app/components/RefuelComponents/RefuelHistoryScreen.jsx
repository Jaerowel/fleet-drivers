import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";

import RefuelRecordCard from "./RefuelRecordCard";
import NewRefuelForm from "./NewRefuelModal";
import Dropdown from "./components/dropdown";

// Import fleets and drivers (where is fuelTypes?)
import { fleets, drivers, fuelTypes } from "./components/dummydata";

export default function FuelHistoryScreen() {
  const safeFleets = fleets || []; // fallback to empty array
  const safeFuelTypes = fuelTypes || [];

  const [records, setRecords] = useState([
    {
      id: 1,
      fleetId: 1,
      vehicle: "Truck A",
      date: "2024-03-12",
      fuelType: "Diesel",
      quantity: "50L",
      cost: "$100",
    },
    {
      id: 2,
      fleetId: 2,
      vehicle: "Van B",
      date: "2024-03-15",
      fuelType: "Gasoline",
      quantity: "40L",
      cost: "$80",
    },
  ]);

  const [selectedFleet, setSelectedFleet] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAddRecord = (newRecord) => {
    const updatedRecords = [
      ...records,
      { ...newRecord, id: records.length + 1, fleetId: selectedFleet },
    ];
    setRecords(updatedRecords);
    setShowForm(false);
    console.log("Record added:", newRecord);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const filteredRecords = selectedFleet
    ? records.filter((record) => record.fleetId === selectedFleet)
    : [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Fuel Refueling History
        </Text>

        {/* Fleet Dropdown */}
        <View className="mb-4">
          <Dropdown
            label="Select Fleet"
            options={safeFleets.map((fleet) => ({
              label: fleet.name,
              value: fleet.id,
            }))}
            selectedValue={
              selectedFleet
                ? {
                    label: safeFleets.find(
                      (fleet) => fleet.id === selectedFleet
                    )?.name,
                    value: selectedFleet,
                  }
                : null
            }
            onSelect={(item) => setSelectedFleet(item.value)} // item looks like {label, value}
          />
        </View>

        {/* List of filtered refuel records */}
        <ScrollView className="mb-4">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <RefuelRecordCard key={record.id} record={record} />
            ))
          ) : (
            <Text className="text-gray-500">
              No records found for the selected fleet.
            </Text>
          )}
        </ScrollView>

        {/* Show the form when "showForm" is true */}
        {showForm && (
          <View className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
            <NewRefuelForm
              fleets={safeFleets}
              fuelTypes={safeFuelTypes}
              onSave={handleAddRecord}
              onCancel={toggleForm}
            />
          </View>
        )}

        {/* Floating Add Button */}
        {!showForm && selectedFleet !== "" && (
          <TouchableOpacity
            className="bg-indigo-600 w-16 h-16 rounded-full absolute bottom-5 right-5 items-center justify-center shadow-lg"
            onPress={toggleForm}
          >
            <Plus color="white" size={28} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
