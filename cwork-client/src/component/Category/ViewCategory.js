// import React from 'react';
// import { Button, Icon } from 'semantic-ui-react';
// import { toast, ToastContainer } from 'react-toastify';
// import agent from '../../api/agent';
// import ModalPopup from '../../common/ModalPopup';

// const ViewCategory = ({ categories }) => {
//   const handleDelete = (e, id) => {
//     e.preventDefault();
//     console.log(id);
//     toast.error('You have deleted the category...');
//     agent.Categories.delete(id);
//   };

//   const handleUpdate = (u, id) => {
//     u.preventDefault();

//     console.log(id);
//   };
//   return (
//     <div style={{ marginTop: '30px' }}>
//       <h3>View Categories</h3>
//       <table className="ui celled table">
//         <thead>
//           <tr>
//             <th>Category Name</th>
//             <th>Min Weight</th>
//             <th>Max Weight</th>
//             <th>Icon</th>
//             <th>Options</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category, i) => (
//             <tr key={i}>
//               <td data-label="categoryName">{category.categoryName}</td>
//               <td data-label="minWeight">{category.minWeight}</td>
//               <td data-label="maxWeight">{category.maxWeight}</td>
//               <td data-label="maxWeight">
//                 <Icon size="big" name={category.icon} />
//               </td>
//               <td data-label="delete">
//                 <Button
//                   icon="minus"
//                   color="red"
//                   size="tiny"
//                   onClick={(e) => handleDelete(e, category.categoryId)}
//                 />

//                 <Button
//                   icon="edit"
//                   color="grey"
//                   size="tiny"
//                   onClick={(u) => <ModalPopup />}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ViewCategory;
