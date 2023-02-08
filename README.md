# eCommerce-rest-api
Node/Express REST API that provides functionality for an eCommerce website. CRUD operations are present for users, products, carts, and orders.

## Running the app
To run locally, 'npm install', then 'npm run dev'

This app includes an 'example.env' file  that contains environment variables for reference. Create a '.env' file that includes all variables found in 'example.env'. Be sure to replace the example values with your specific environment/needs.

This app requires a [PostgreSQL](https://www.postgresql.org/) database to be running on a local machine.
To load the database run 'npm run buildDb'. The database setup can be viewed in the file 'dbSetup.js'.

Once the app is running locally, you can access the API at `http://localhost:<your-port>`

## Resources
- [REST Architecture](https://www.codecademy.com/articles/what-is-rest)
- [Setting up Postman](https://learning.postman.com/docs/getting-started/settings/)
- [Using pgAdmin](https://www.pgadmin.org/docs/pgadmin4/development/getting_started.html)
- [Postgres Cheat Sheet](https://www.postgresqltutorial.com/postgresql-cheat-sheet/)

# Options for Extension
- Add additional API endpoints
- Add ability to maintain multiple carts per user