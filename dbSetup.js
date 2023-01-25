require("dotenv").config();
const pg = require("pg");

(async () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS Users (
        id INT  PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        email VARCHAR(100)  NOT NULL UNIQUE,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50)
    );`;

  const productsTable = ` 
        CREATE TABLE IF NOT EXISTS Products (
        id INT  PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(50) NOT NULL,
        price BIGINT NOT NULL ,
        description VARCHAR(100),
        image VARCHAR(100)
    );`;

  const ordersTable = `
    CREATE TABLE IF NOT EXISTS Orders (
        id INT  PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        total BIGINT NOT NULL,
        status VARCHAR(50),
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users(id) 
    );`;

  const orderItemsTable = `
        CREATE TABLE IF NOT EXISTS Order_items (
        id INT  PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        order_id INT NOT NULL,
        quantity INT NOT NULL,
        price BIGINT NOT NULL,
        product_id INT NOT NULL,
        name VARCHAR(50) NOT NULL,
        description VARCHAR(100) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES Orders(id)
    );`;

  const cartsTable = `
    CREATE TABLE IF NOT EXISTS Carts (
        id INT  PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users(id)
    );`;

  const cartItemsTable = `
        CREATE TABLE IF NOT EXISTS Cart_items (
        id INT  PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        cart_id INT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (cart_id) REFERENCES Carts(id),
        FOREIGN KEY (product_id) REFERENCES Products(id)
    );`;

  try {
    const db = new pg.Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT
    });
    await db.connect();
    await db.query(usersTable);
    await db.query(productsTable);
    await db.query(ordersTable);
    await db.query(orderItemsTable);
    await db.query(cartsTable);
    await db.query(cartItemsTable);
    console.log("Tables Created!");
    await db.end();
  } catch (err) {
    console.log(err);
  }
})();
