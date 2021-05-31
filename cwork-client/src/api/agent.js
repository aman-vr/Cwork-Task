import axios from 'axios';

import { toast } from 'react-toastify'; // RT

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, (error) => {
  // check network error object
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network Error, Check API Server'); //RT
  }
  const { status } = error.response;
  // check if status 404
  if (status === 404) {
    // history.push('/notfound');
  }
  // check if 500 internal server
  if (status === 500) {
    toast.error('Server Error'); //RT
  }
});

const responseBody = (response) => response.data;

const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));

const request = {
  get: (url) => axios.get(url).then(sleep(500)).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
};

const Categories = {
  list: () => request.post('category/listCategories/'),
  recent: () => request.post('category/recentCategory/'),
  create: (category) => request.post('category/createCategory', category),
  update: (id, category) => request.put(`category/updateCategory/${id}`, category),
  delete: (id) => request.post(`category/deleteCategory?id=${id}`),
  getCategoryByWeight: (number) =>
    request.get(`category/categoryByWeight?weight=${number}`),
  details: (id) => request.get(`category/categoryById?id=${id}`),
};

const Vehicle = {
  list: () => request.post('vehicle/listVehicles/'),
  create: (vehicle) => request.post('vehicle/createVehicle', vehicle),
};
const Manufacturer = {
  list: () => request.post('manufacturer/listManufacturers/'),
  create: (manufacturer) =>
    request.post('manufacturer/createManufacturer', manufacturer),
};
export default { Categories, Vehicle, Manufacturer };
