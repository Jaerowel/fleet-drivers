// useRefuelForm.js
import { useState } from 'react';

export default function useRefuelForm(onSave) {
  const [vehicle, setVehicle] = useState('');
  const [date, setDate] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');

  const resetForm = () => {
    setVehicle('');
    setDate('');
    setFuelType('');
    setQuantity('');
    setCost('');
  };

  const handleSubmit = () => {
    if (!vehicle || !date || !fuelType || !quantity || !cost) {
      alert('Please fill all fields');
      return;
    }

    const newRecord = { vehicle, date, fuelType, quantity, cost };

    if (typeof onSave === 'function') {
      onSave(newRecord);
      resetForm();
    }
  };

  return {
    vehicle, setVehicle,
    date, setDate,
    fuelType, setFuelType,
    quantity, setQuantity,
    cost, setCost,
    handleSubmit,
    resetForm
  };
}
