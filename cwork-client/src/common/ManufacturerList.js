import React, { useEffect, useState } from 'react';
import agent from '../api/agent';
const ManufacturerList = ({ name, onChange, value }) => {
  const [manufacturers, setManufacturers] = useState([]);

  const getManufacturerList = async () => {
    try {
      const manufacturers = await agent.Manufacturer.list();
      setManufacturers(manufacturers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getManufacturerList();
  }, []);
  return (
    <select htmlFor="manufacturers" name={name} onChange={onChange}>
      <option value="">Select Manufacturer</option>
      {manufacturers.map((manufacturer) => (
        <option
          key={manufacturer.manufacturingId}
          value={manufacturer.manufacturingId}
        >
          {manufacturer.manufacturerName}
        </option>
      ))}
    </select>
  );
};

export default ManufacturerList;
