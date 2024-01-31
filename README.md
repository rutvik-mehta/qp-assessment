# Grocery App

Welcome to the Grocery App! This application allows users to manage grocery items, place orders, and maintain inventory levels.

## Features

- **User Authentication:** Users can sign up and log in to manage their grocery orders.
- **CRUD Operations:** Admin users can create, read, update, and delete grocery items.
- **Order Management:** Users can place orders for grocery items.
- **Inventory Tracking:** Admins can manage inventory levels for each grocery item.

## Technologies Used

- Node.js
- Express.js
- MySQL Database
- Sequelize ORM
- JWT Authentication
- Docker

## Getting Started

To get started with the Grocery App, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.
2. **Install Dependencies**: Run `npm install` to install all required dependencies.
3. **Set Up Environment Variables**: Configure your MySQL database credentials in a `.env` file.
4. **Database Setup**: Set up your MySQL database and import the provided schema.
5. **Start the Application**: Run `npm start` to start the Node.js server.
6. **Access the Application**: Access the Grocery App in your web browser at `http://localhost:3000`.

## Folder Structure

The project follows a typical MVC (Model-View-Controller) architecture:

- **models**: Contains Sequelize model definitions for database tables.
- **routes**: Defines API routes and controllers for handling HTTP requests.
- **controllers**: Contains logic for processing HTTP requests and generating responses.

## License

This project is licensed under the [MIT License](LICENSE).
