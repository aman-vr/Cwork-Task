import React, { useEffect, useReducer, useState } from 'react';
import { Icon, Table } from 'semantic-ui-react';
import _ from 'lodash';
import agent from '../../api/agent';
import { toast } from 'react-toastify';

const UserDataTable = () => {
  const [vehicleData, setVehicleData] = useState([]);

  function exampleReducer(state = vehicleData, action) {
    switch (action.type) {
      case 'CHANGE_SORT':
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.reverse(),
            direction:
              state.direction === 'ascending' ? 'descending' : 'ascending',
          };
        }
        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: 'ascending',
        };

      case 'SET_VEHICLE':
        return {
          ...state,
          data: action.data,
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(exampleReducer, {
    column: null,
    direction: null,
    data: vehicleData,
  });
  const { column, data, direction } = state;
  const getVehicleData = async () => {
    try {
      const vehicleData = await agent.Vehicle.list();
      dispatch({ type: 'SET_VEHICLE', data: vehicleData });
      setVehicleData(vehicleData);
      toast.success('Vehicle data received');
    } catch (error) {
      toast.error('Error Occured');
    }
  };
  useEffect(() => {
    getVehicleData();
  }, []);

  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'ownerName' ? direction : null}
            onClick={() =>
              dispatch({ type: 'CHANGE_SORT', column: 'ownerName' })
            }
          >
            Owner Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'manufacturerName' ? direction : null}
            onClick={() =>
              dispatch({ type: 'CHANGE_SORT', column: 'manufacturerName' })
            }
          >
            Manufacturer
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'year' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'year' })}
          >
            Year of Manufacture
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'weight' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'weight' })}
          >
            Weight
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'categoryIcon' ? direction : null}
            onClick={() =>
              dispatch({ type: 'CHANGE_SORT', column: 'categoryIcon' })
            }
          >
            Category
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((userInfo, i) => (
          <Table.Row key={i}>
            <Table.Cell>{userInfo.ownerName}</Table.Cell>
            <Table.Cell>{userInfo.manufacturerName}</Table.Cell>
            <Table.Cell>{userInfo.year}</Table.Cell>
            <Table.Cell>{userInfo.weight}</Table.Cell>
            <Table.Cell>
              <Icon name={userInfo.categoryIcon} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
export default UserDataTable;
