import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Button, Form, Label, Segment } from 'semantic-ui-react';
import AssignedCategory from '../../common/AssignedCategory';
import ManufacturerList from '../../common/ManufacturerList';

const AddVehicle = ({
  handleSubmit,
  assignCategory,
  handleChange,
  vehicle,
  categoryAssigned,
}) => {
  return (
    <Segment>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Field>
          <input
            type="text"
            placeholder="Owner Name"
            value={vehicle.name}
            onChange={handleChange}
            name="ownerName"
            required
          />
        </Form.Field>
        <Form.Field>
          <input
            type="email"
            placeholder="Email Id"
            value={vehicle.emailId}
            onChange={handleChange}
            name="emailId"
            required
          />
        </Form.Field>
        <Form.Field>
          <input
            type="number"
            placeholder="Year"
            value={vehicle.year}
            onChange={handleChange}
            name="year"
            required
            min="1980"
            max="2022"
            step="1"
          />
        </Form.Field>
        <Form.Field>
          <ManufacturerList
            name="manufacturingId"
            onChange={handleChange}
            value={vehicle.manufacturingId}
          />
        </Form.Field>

        <Form.Field inline>
          <input
            type="number"
            placeholder="Weight"
            value={vehicle.weight}
            onChange={handleChange}
            name="weight"
            min="0"
            step=".01"
          />

          <Label
            as="a"
            basic
            color="blue"
            pointing="left"
            onClick={() => assignCategory(vehicle.weight)}
          >
            Assign Category
          </Label>
        </Form.Field>
        <AssignedCategory
          name="category"
          onChange={handleChange}
          value={categoryAssigned.categoryName}
          icon={categoryAssigned.icon}
        />

        <ToastContainer />

        <div>
          <Button
            icon="plus"
            content="Submit"
            primary
            disabled={!vehicle.categoryId || !vehicle.manufacturingId}
          />
        </div>
      </Form>
    </Segment>
  );
};

export default AddVehicle;
