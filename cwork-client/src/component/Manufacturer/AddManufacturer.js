import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Form, Segment } from 'semantic-ui-react';
import agent from '../../api/agent';

const AddManufacturer = () => {
  const [manufacturer, setManufacturer] = useState({
    manufacturerName: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setManufacturer({ ...manufacturer, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      await agent.Manufacturer.create(manufacturer);
      toast.success('Manufacturer Added');
      setManufacturer({ ...manufacturer, manufacturerName: '' });
    } catch (error) {
      toast.error('Error Occurred');
    }
  };
  return (
    <Segment>
      <h3>Add Manufacturer</h3>

      <Form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <Form.Field>
            <input
              type="text"
              placeholder="Manufacturer Name"
              value={manufacturer.manufacturerName}
              onChange={handleChange}
              name="manufacturerName"
            />
          </Form.Field>

          <ToastContainer />
        </div>

        <div>
          <Form.Field>
            <Button
              icon="plus"
              content="Submit"
              primary
              disabled={!manufacturer.manufacturerName}
            />
          </Form.Field>
        </div>
      </Form>
    </Segment>
  );
};

export default AddManufacturer;
