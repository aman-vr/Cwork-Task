import React, { Fragment, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Form, Icon, Message, Grid } from 'semantic-ui-react';

import agent from '../../api/agent';

const CategoryDashboard = () => {
  const [listCategories, setListCategories] = useState([]);
  const [initialValueMessage, setInitialValueMessage] = useState('');
  const [recentCategory, setRecentCategory] = useState({});
  const categoryInitState = {
    categoryName: '',
    minWeight: '',
    maxWeight: '',
    icon: '',
  };
  const [category, setCategory] = useState(categoryInitState);
  const [categoryToUpdate, setCategoryToUpdate] = useState(false);

  const checkFirstCategoryEntry = async () => {
    try {
      const categoryStatus = await agent.Categories.list();
      if (categoryStatus.length === 0) {
        setInitialValueMessage(
          'Min Weight should start from 0, as this is your first category in database'
        );
      } else {
        setListCategories(categoryStatus);
      }
    } catch (error) {
      toast.error('Error from API.');
    }
  };

  const lastCategorySaved = async () => {
    try {
      const recentCategory = await agent.Categories.recent();
      setRecentCategory(recentCategory);
    } catch (error) {}
  };

  useEffect(() => {
    checkFirstCategoryEntry();
    lastCategorySaved();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const categoryValue = { ...category };
    categoryValue[e.target.name] = e.target.value;
    if (categoryToUpdate) {
      categoryValue.minWeight = Number.parseFloat(categoryValue.minWeight);
      categoryValue.maxWeight = Number.parseFloat(categoryValue.maxWeight);
      setCategory(categoryValue);
    } else {
      categoryValue.minWeight = Number.parseFloat(recentCategory.maxWeight + 1);
      categoryValue.maxWeight = Number.parseFloat(categoryValue.maxWeight);
      setCategory(categoryValue);
    }
  };

  const handleSubmit = () => {
    if (category.minWeight >= category.maxWeight) {
      setCategory({
        ...category,
        minWeight: category.minWeight,
        maxWeight: (category.maxWeight = category.minWeight + 1),
      });
      toast.error(`Max weight should be greater than min weight`);
    } else {
      setCategory({
        ...category,
        categoryName: category.categoryName,
        maxWeight: Number(category.maxWeight),
        minWeight: parseFloat(category.minWeight),
      });
      agent.Categories.create(category);
      toast.success('Category added!!');
      setCategory(categoryInitState);
    }
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    toast.error('You have deleted the category...');
    agent.Categories.delete(id);
  };
  const sendUpdatedData = async (id, c) => {
    c.preventDefault();
    try {
      console.log(id, c.target.value);
      //await agent.Categories.update(id, c);
      
      toast.success('Updated Succesfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (u, id) => {
    u.preventDefault();
    try {
      const category = await agent.Categories.details(id);
      setCategory(category);
      setCategoryToUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={5}>
          <Fragment>
            <h1>Category CRUD</h1>

            <Form
              onSubmit={handleSubmit}
              autoComplete="off"
              name="categoryFrom"
            >
              <div>
                <Form.Field inline>
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={category.categoryName}
                    onChange={handleChange}
                    name="categoryName"
                    required
                  />
                </Form.Field>
                <Form.Field inline>
                  <input
                    type="number"
                    placeholder="Min Weight"
                    value={category.minWeight}
                    onChange={handleChange}
                    name="minWeight"
                  />
                </Form.Field>
                <Form.Field inline>
                  <input
                    type="number"
                    placeholder="Max Weight"
                    value={category.maxWeight}
                    onChange={handleChange}
                    name="maxWeight"
                  />
                </Form.Field>
                <Form.Field inline>
                  <input
                    type="text"
                    placeholder="Category Icon"
                    value={category.icon}
                    onChange={handleChange}
                    name="icon"
                    required
                  />

                  <Icon size="big" name={category.icon} />

                  <Message info style={{ width: '55%' }}>
                    <a
                      href="https://react.semantic-ui.com/elements/icon/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Icon Directory
                    </a>
                  </Message>
                </Form.Field>
                {initialValueMessage ? (
                  <Message content={initialValueMessage}></Message>
                ) : (
                  <></>
                )}
                <ToastContainer />
              </div>

              <Form.Field>
                {categoryToUpdate ? (
                  <Button
                    icon="edit outline"
                    content="Update"
                    secondary
                    disabled={!category.maxWeight}
                    onClick={(c) => sendUpdatedData(category.categoryId, c)}
                  />
                ) : (
                  <Button
                    icon="plus"
                    content="Submit"
                    primary
                    disabled={!category.maxWeight}
                  />
                )}
              </Form.Field>
            </Form>
          </Fragment>
        </Grid.Column>
        <Grid.Column width={11}>
          <div style={{ marginTop: '30px' }}>
            <h3>View Categories</h3>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Min Weight</th>
                  <th>Max Weight</th>
                  <th>Icon</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {listCategories.map((category, i) => (
                  <tr key={i}>
                    <td data-label="categoryName">{category.categoryName}</td>
                    <td data-label="minWeight">{category.minWeight}</td>
                    <td data-label="maxWeight">{category.maxWeight}</td>
                    <td data-label="maxWeight">
                      <Icon size="big" name={category.icon} />
                    </td>
                    <td data-label="delete">
                      <Button
                        icon="minus"
                        color="red"
                        size="tiny"
                        onClick={(e) => handleDelete(e, category.categoryId)}
                      />

                      <Button
                        icon="edit"
                        color="grey"
                        size="tiny"
                        onClick={(u) => handleUpdate(u, category.categoryId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ToastContainer />
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CategoryDashboard;
