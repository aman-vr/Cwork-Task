import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Grid } from 'semantic-ui-react';
import { history } from '../..';
import agent from '../../api/agent';
import AddVehicle from './AddVehicle';
import VehicleViewCard from './VehicleViewCard';

const VehicleDashboard = () => {
  const initState = {
    ownerName: '',
    emailId: '',
    manufacturingId: '',
    year: '',
    weight: '',
    categoryId: '',
  };
  const resetState = {
    ownerName: '',
    emailId: '',
    manufacturingId: null,
    year: '',
    weight: '',
    categoryId: null,
  };
  const [vehicle, setVehicle] = useState(initState);
  const [categoryAssigned, setCategoryAssigned] = useState({
    categoryName: '',
    categoryIcon: '',
    errorText: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const vehicleDetails = { ...vehicle };
    vehicleDetails[e.target.name] = e.target.value;
    vehicleDetails.manufacturingId = Number.parseInt(
      vehicleDetails.manufacturingId
    );
    vehicleDetails.weight = Number.parseFloat(vehicleDetails.weight);
    setVehicle(vehicleDetails);
  };
  const assignCategory = async (number) => {
    if (!vehicle.weight) {
      toast.error('Please insert weight of the vehicle');
    } else {
      try {
        const categoryAssigned = await agent.Categories.getCategoryByWeight(
          number
        );
        setCategoryAssigned(categoryAssigned);
        setVehicle({ ...vehicle, categoryId: categoryAssigned.categoryId });
        toast.success(`Category Assigned as ${categoryAssigned.categoryName} `);
      } catch (error) {
        toast.error('No Category available for this Weight.');
        console.log(error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await agent.Vehicle.create(vehicle);
      toast.success('Vehicle Added');
      history.push('/user');
    } catch (error) {
      toast.error('Error Occurred');
    }
  };
  return (
    <div>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={6}>
            <AddVehicle
              handleSubmit={handleSubmit}
              assignCategory={assignCategory}
              handleChange={handleChange}
              vehicle={vehicle}
              categoryAssigned={categoryAssigned}
            />
          </Grid.Column>
          <Grid.Column>
            <VehicleViewCard />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default VehicleDashboard;
