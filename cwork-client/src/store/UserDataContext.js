import React, { useState, createContext } from 'react';
import { toast } from 'react-toastify';
import agent from '../api/agent';
export const UserDataContext = createContext();

export const UserDataProvider = (props) => {
  const [vehicleData, setVehicleData] = useState([]);
  const getVehicleData = async () => {
    try {
      const vehicleData = await agent.Vehicle.list();
      setVehicleData(vehicleData);
      toast.success('Vehicle data received');
    } catch (error) {
      toast.error('Error Occured');
    }
  };

  return (
    <UserDataContext.Provider
      value={[vehicleData, setVehicleData, getVehicleData]}
    >
      {props.children}
    </UserDataContext.Provider>
  );
};
