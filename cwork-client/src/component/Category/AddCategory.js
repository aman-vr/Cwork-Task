// import React, { Fragment, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import { Button, Form, Icon, Label, Message } from 'semantic-ui-react';
// import agent from '../../api/agent';
// import ModalPopup from '../../common/ModalPopup';
// import '../../layout/App.css';

// const AddCategory = ({ initialValueMessage, recent }) => {
//   const categoryInitState = {
//     categoryName: '',
//     minWeight: '',
//     maxWeight: '',
//     icon: '',
//   };
//   const [category, setCategory] = useState(categoryInitState);

//   const handleChange = (e) => {
//     e.preventDefault();
//     const categoryValue = { ...category };
//     categoryValue[e.target.name] = e.target.value;
//     categoryValue.minWeight = Number.parseFloat(recent.maxWeight + 1);
//     categoryValue.maxWeight = Number.parseFloat(categoryValue.maxWeight);
//     setCategory(categoryValue);
//     console.log(category);
//   };

//   const handleSubmit = () => {
//     if (category.minWeight >= category.maxWeight) {
//       setCategory({
//         ...category,
//         minWeight: category.minWeight,
//         maxWeight: (category.maxWeight = category.minWeight + 1),
//       });
//       console.log(category);
//       toast.error(`Max weight should be greater than min weight`);
//     } else {
//       setCategory({
//         ...category,
//         categoryName: category.categoryName,
//         maxWeight: Number(category.maxWeight),
//         minWeight: parseFloat(category.minWeight),
//       });
//       agent.Categories.create(category);
//       toast.success('Category added!!');
//       // listCategories.push(category);
//       setCategory(categoryInitState);
//     }
//   };

//   return (
//     <Fragment>
//       <h1>Category CRUD</h1>

//       <Form onSubmit={handleSubmit} autoComplete="off" name="categoryFrom">
//         <div>
//           <Form.Field inline>
//             <input
//               type="text"
//               placeholder="Category Name"
//               value={category.categoryName}
//               onChange={handleChange}
//               name="categoryName"
//               required
//             />
//           </Form.Field>
//           <Form.Field inline>
//             <input
//               type="number"
//               placeholder="Min Weight"
//               value={category.minWeight}
//               onChange={handleChange}
//               name="minWeight"
//             />
//           </Form.Field>
//           <Form.Field inline>
//             <input
//               type="number"
//               placeholder="Max Weight"
//               value={category.maxWeight}
//               onChange={handleChange}
//               name="maxWeight"
//             />
//           </Form.Field>
//           <Form.Field inline>
//             <input
//               type="text"
//               placeholder="Category Icon"
//               value={category.icon}
//               onChange={handleChange}
//               name="icon"
//               required
//             />

//             <Icon size="big" name={category.icon} />

//             <Message info style={{ width: '55%' }}>
//               <a
//                 href="https://react.semantic-ui.com/elements/icon/"
//                 rel="noopener noreferrer"
//                 target="_blank"
//               >
//                 Icon Directory
//               </a>
//             </Message>
//           </Form.Field>
//           {initialValueMessage ? (
//             <Message content={initialValueMessage}></Message>
//           ) : (
//             <></>
//           )}
//           <ToastContainer />
//         </div>

//         <Form.Field>
//           <Button
//             icon="plus"
//             content="Submit"
//             primary
//             disabled={!category.maxWeight}
//           />
//         </Form.Field>
//       </Form>
//     </Fragment>
//   );
// };

// export default AddCategory;
