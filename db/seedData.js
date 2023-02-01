const client = require('./client');

const { createUser, getAllUsers, updateUser } = require('./users');
const { createBreed, updateBreed, getAllBreeds } = require('./breeds');
const {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  getProductByName,
  getProductsByPrice,
} = require('./products');
const { createOrder, getOrdersWithoutProducts } = require('./orders');
const { addProductToOrder } = require('./order_products');

const dropTables = async () => {
  try {
    console.log('Dropping tables...');

    await client.query(`
            DROP TABLE IF EXISTS orderproducts;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS breeds;
            DROP TABLE IF EXISTS guests;
            DROP TABLE IF EXISTS users;
        `);
  } catch (error) {
    console.log('Error dropping tables');
    throw error;
  }
};

const buildTables = async () => {
  try {
    console.log('Building tables...');

    await client.query(`
    
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false,
            "firstName" VARCHAR(50) NOT NULL,
            "lastName" VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            "profilePicture" VARCHAR(255),
            UNIQUE(username, email)
        );

        CREATE TABLE guests (
          id SERIAL PRIMARY KEY,
          "isAdmin" BOOLEAN DEFAULT false
        );

        CREATE TABLE breeds (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) UNIQUE NOT NULL
      );

        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            image VARCHAR(255),
            name VARCHAR(100) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            "breedId" INTEGER REFERENCES breeds(id),
            price DECIMAL NOT NULL
        );

        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "guestId" INTEGER REFERENCES guests(id),
            "isOpen" BOOLEAN DEFAULT true
        );

        CREATE TABLE orderproducts (
            id SERIAL PRIMARY KEY,
            "orderId" INTEGER REFERENCES orders(id),
            "productId" INTEGER REFERENCES products(id),
            quantity INTEGER NOT NULL,
            CONSTRAINT UC_OrderProducts UNIQUE ("orderId", "productId")
        );
    `);
  } catch (error) {
    console.log('Error building tables');
    throw error;
  }
};

const createInitialUsers = async () => {
  console.log('Creating users...');

  try {
    const usersToCreate = [
      {
        username: 'ATown2021',
        password: 'FullStack',
        isAdmin: true,
        firstName: 'Aaron',
        lastName: 'Sexton',
        email: 'aaronsexton5@gmail.com',
        profilePicture: 'https://imgur.com/V4RclNb.jpg',
      },
      {
        username: 'jstaff123',
        password: 'FullStack',
        isAdmin: true,
        firstName: 'Jerrod',
        lastName: 'Stafford',
        email: 'jerrodstafford10@gmail.com',
        profilePicture: 'https://imgur.com/V4RclNb.jpg',
      },
      {
        username: 'T-Rey2020',
        password: 'FullStack',
        isAdmin: true,
        firstName: 'Trey',
        lastName: 'Byars',
        email: 'treybyars93@gmail.com',
        profilePicture: 'https://imgur.com/V4RclNb.jpg',
      },
      {
        username: 'nadiadb',
        password: 'gamergirl20',
        isAdmin: true,
        firstName: 'Nadia',
        lastName: 'DuBell',
        email: 'ndubell01@gmail.com',
        profilePicture: 'https://imgur.com/V4RclNb.jpg',
      },
    ];

    const users = [];

    for (const user of usersToCreate) {
      users.push(await createUser(user));
    }

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.log('Error creating initial users');
    throw error;
  }
};

const createInitialBreeds = async () => {
  console.log('Creating initial breeds...');
  try {
    const breedsToCreate = [
      { name: 'Thoroughbred' },
      { name: 'Friesian' },
      { name: 'American Quarter' },
      { name: 'Andalusian' },
      { name: 'Arabian' },
      { name: 'Lipizzan' },
      { name: 'Palomino' },
      { name: 'Clydesdale' },
    ];

    const breeds = [];

    for (const breed of breedsToCreate) {
      breeds.push(await createBreed(breed));
    }
    console.log('Breeds created:');
    // console.log(breeds);
    console.log('Finished creating breeds!');
  } catch (error) {
    console.log('Error creating initial breeds');
    throw error;
  }
};

const createInitialProducts = async () => {
  console.log('Creating initial products...');

  try {
    const productsToCreate = [
      {
        name: 'Thoroughbred Model Horse',
        description: `Thoroughbreds are best known for their use in horse racing. 
        They are high-spirited, agile, and quick. Developed in the 17th and 18th 
        centuries, this breed is the result of crossbreeding of imported Arabian, 
        Barb, and Turkoman stallions with foundation English mares. All modern 
        Thoroughbreds are said to be able to trace back to three original stallions. 
        Good Thoroughbreds have well-balanced conformation with lean body and long 
        legs. They can be seen in a variety of colors and coat patterns.  
        Thoroughbreds are also used in other riding disciplines and are 
        often crossbred to improve other horse breeds.`,
        breedId: 1,
        price: 5000.0,
        image: 'https://i.imgur.com/9RhQMDK.jpg',
      },
      {
        name: 'Bucking Friesian Model Horse',
        description: `Friesian horses are a light draft type of horse, named for where 
        they originated in Friesland, Netherlands. They are easily recognized by their 
        black coat (although some can be chestnut in color). They stand tall and 
        muscular with proportionally shorter limbs, beautifully shaped heads and long 
        flowing mane and tail. Friesians are graceful and agile and are often used as 
        sporting horses today.`,
        breedId: 2,
        price: 10.25,
        image: 'https://i.imgur.com/FLqRtqe.jpg',
      },
      {
        name: 'American Quarter Model Horse',
        description: `American Quarter Horses are the most owned horse breed in the USA 
        today. They are the result of breeding the Thoroughbred horse with 'native'
        breeds in America. Quarter Horses are great sprinters and often race in ¼ mile 
        racing. Most are compact built with good conformation and are bred in many 
        recognized colors. These horses are intelligent and sensible with a natural 
        instinct to work well with their human counterparts, making them valuable 
        partners for ranchers and cattlemen.`,
        breedId: 3,
        price: 25.34,
        image: 'https://i.imgur.com/Vq69eiB.jpg',
      },
      {
        name: 'Andalusian Model Horse',
        description: `Andalusian horses are also known as Pure Spanish Horses (PRE). They 
        were established as a breed in the 15th century in the Iberian Peninsula. Because 
        of their strength and elegance, they were originally known as military mounts 
        ridden by diplomats and nobility all across Europe. These exceptionally 
        beautiful and athletic animals have a docile nature and were used in breeding to 
        create other breeds. Andalusians can be identified by their muscular size and very 
        full manes and tails. They are most commonly grey-coated, but can be seen in other 
        colors. You will often see them used in movies and a variety of equestrian activities.`,
        breedId: 4,
        price: 50.15,
        image: 'https://i.imgur.com/p2MTXB9.jpg',
      },
      {
        name: 'Arabian Running Model Horse',
        description: `Originally came from the Middle East in the Arabian Peninsula. They are 
        one of the oldest breeds in the world and are widely identified by having a slender 
        appearance with arched neck and high tail carriage. These horses have high endurance 
        and high speed and are now often found participating in endurance racing.`,
        breedId: 5,
        price: 100.12,
        image: 'https://i.imgur.com/V03UdeV.jpg',
      },
      {
        name: 'Realistic Lipizzan Prancing Model Horse',
        description: `The Lippizan was named after a famous stud belonging to the Austrian 
        Habsburg monarchy in the 16th century.. These horses are renown for their 
        performances at the Spanish Riding School in Vienna, Austria and their 
        accomplished high level dressage. Most are light gray to white in color. Lippizans 
        are bred selectively to preserve the breed lines and are considered rare with only 
        approximately 11,600 purebreds worldwide. This breed possesses the rare combination 
        of beauty and nobility along with courage, strength, temperament and intelligence.`,
        breedId: 6,
        price: 150.05,
        image: 'https://i.imgur.com/Dsh9r2h.jpg',
      },
      {
        name: 'Clydesdale Model Horse',
        description: `Clydesdales are a type of draft horse, named for where they originated 
        in Clydesdale, Scotland. They were originally a smaller breed but have been bred to 
        be very large and powerful. They can be recognized by their stocky, muscular size, 
        large facial shape, and long hair featherings on legs. The first Clydesdale horses 
        were used for hauling and agriculture work but are now, with their elegant gait, 
        more often used for parades and demonstrations.`,
        breedId: 8,
        price: 600.38,
        image: 'https://i.imgur.com/TNNaGoh.jpg',
      },
      {
        name: 'Palomino Model Horse',
        description: `It's a Palomino!`,
        breedId: 7,
        price: 49.99,
        image: 'https://i.imgur.com/NOebewQ.jpg',
      },
    ];

    const products = [];

    for (const product of productsToCreate) {
      products.push(await createProduct(product));
    }
    console.log('Products created:');
    // console.log(products);
    console.log('Finished creating products!');
  } catch (error) {
    console.log('Error creating initial products');
    throw error;
  }
};

const createInitialOrders = async () => {
  console.log('Creating initial orders...');
  try {
    const ordersToCreate = [
      { userId: 1, isOpen: true },
      { userId: 2, isOpen: true },
      { userId: 3, isOpen: true },
      { userId: 4, isOpen: true },
    ];

    const orders = [];

    for (const order of ordersToCreate) {
      const userId = order.userId;
      const isOpen = order.isOpen;
      orders.push(await createOrder(userId, isOpen));
    }
    console.log('Orders created:');
    // console.log(orders);
    console.log('Finished creating orders!');
  } catch (error) {
    console.log('Error creating initial orders');
    throw error;
  }
};

const createInitialOrderProducts = async () => {
  console.log('Creating intial order products...');

  try {
    const [order1, order2, order3, order4] = await getOrdersWithoutProducts();
    const [product1, product2, product3, product4, product5, product6] =
      await getAllProducts();

    const orderProductsToCreate = [
      {
        userId: 1,
        orderId: order1.id,
        productId: product1.id,
        quantity: 1,
      },
      {
        userId: 1,
        orderId: order1.id,
        productId: product2.id,
        quantity: 2,
      },
      {
        userId: 1,
        orderId: order1.id,
        productId: product3.id,
        quantity: 100,
      },
      {
        userId: 2,
        orderId: order2.id,
        productId: product4.id,
        quantity: 1,
      },
      {
        userId: 2,
        orderId: order2.id,
        productId: product1.id,
        quantity: 2,
      },
      {
        userId: 3,
        orderId: order3.id,
        productId: product5.id,
        quantity: 10,
      },
      {
        userId: 4,
        orderId: order4.id,
        productId: product6.id,
        quantity: 5,
      },
    ];

    const orderProducts = [];

    for (const orderProduct of orderProductsToCreate) {
      orderProducts.push(await addProductToOrder(orderProduct));
    }

    console.log('Order products created:');
    // console.log(orderProducts);
    console.log('Finished creating order products');
  } catch (error) {
    console.log('Error creating order products');
    throw error;
  }
};

const rebuildDB = async () => {
  try {
    // await client.connect();

    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialBreeds();
    await createInitialProducts();
    await createInitialOrders();
    await createInitialOrderProducts();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
};


module.exports = { rebuildDB };

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