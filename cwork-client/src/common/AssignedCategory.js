import React from 'react';
import { Message } from 'semantic-ui-react';

const AssignedCategory = ({ value, icon }) => {
  return (
    <Message icon={icon} header={` Category Assigned : ${value}`} compact />
  );
};

export default AssignedCategory;
