// const testDB = async () => {
//   try {
//     console.log('Testing database...');

//     console.log('Calling getAllUsers');
//     const users = await getAllUsers();

//     console.log('Calling updateUsers on users[0]');
//     const updateUserResult = await updateUser(users[0].id, {
//       username: 'Newname Sogood',
//       password: 'NewPasswordWhoThis?',
//       isAdmin: false,
//       firstName: 'Newname',
//       lastName: 'Sogood',
//       email: 'thisismyemail@gmail.com',
//     });

//     console.log('Calling getAllBreeds');
//     const breeds = await getAllBreeds();

//     console.log('Calling updateBreed on breeds[0]');
//     const updateBreedResult = await updateBreed(breeds[0].id, {
//       name: 'Brand New Horse Breed',
//     });

//     console.log('Calling getAllProducts');
//     const products = await getAllProducts();
//     console.log('Result: ', products);

//     console.log('Calling getProductById on products with the id of 3');
//     const getProductByIdResult = await getProductById(3);
//     console.log('Result: ', getProductByIdResult);

//     console.log(
//       'Calling getProductById on products with the name of Lil Sebastian'
//     );
//     const getProductByNameResult = await getProductByName('Lil Sebastian');
//     console.log('Result: ', getProductByNameResult);

//     console.log('Calling getProductByPrice with the price of $10');
//     const getProductsByPriceResult = await getProductsByPrice(10);
//     console.log('Result: ', getProductsByPriceResult);

//     console.log('Calling updateProduct on products[0]');
//     const updateProductResult = await updateProduct(products[0].id, {
//       name: 'Brand New Product',
//       description: 'That New Product Smell',
//       breedId: 1,
//       price: 1000,
//     });
//     console.log('Result: ', updateProductResult);

//     console.log('Calling deleteProduct on products[0]');
//     const deleteProductResult = await deleteProduct(products[0].id);
//     console.log('Result: ', deleteProductResult);

//     console.log('Database tested!');
//   } catch (err) {
//     console.log('Error testing database!');
//     throw err;
//   }
// };