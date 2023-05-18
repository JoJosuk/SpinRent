# SpinRent

**Description**: This repository contains code for the SpinRent web application, built using the MERN stack. SpinRent is a platform that allows users to rent vehicles for short-term use. The repository consists of a backend API built with Node.js and Express, located in the `api` folder, and a frontend application built with React and Vite, located in the `SpinRent` folder.

## MERN Stack

The MERN stack is a popular JavaScript stack used for building full-stack web applications. It consists of the following technologies:

- **MongoDB**: A NoSQL document database that stores data in a flexible, JSON-like format.
- **Express**: A fast and minimalist web framework for Node.js that provides a robust set of features for web and API development.
- **React**: A JavaScript library for building user interfaces, allowing for the creation of dynamic and interactive frontend components.
- **Node.js**: A JavaScript runtime environment that allows the execution of JavaScript code outside of a web browser, commonly used for building server-side applications.

By using the MERN stack, SpinRent leverages the power of MongoDB for data storage, Express for building the backend API, React for creating the frontend user interface, and Node.js for running the server-side code.

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/JoJosuk/SpinRent.git
```

2. Install the dependencies for the backend:

```bash
cd SpinRent/api
npm install
```

3. Install the dependencies for the frontend:

```bash
cd ../SpinRent
npm install
```

4. Start the backend server:

```bash
node index.js
```

5. Start the frontend development server:

```bash
npm start
```

6. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to access the SpinRent application.

Please note that the backend server is running on [http://localhost:4000](http://localhost:4000) and the frontend development server is running on [http://localhost:5173](http://localhost:5173).

## Backend

The backend of the application is built with Node.js and Express. It uses MongoDB as the database for storing user data, vehicle listings, and bookings. The backend API provides various endpoints for user authentication, managing vehicle listings, making bookings, and handling file uploads.

The backend code consists of models, uploads, and the main `app.js` file. The `api/models` folder contains the Mongoose models for user, vehicle, and booking data. The `api/uploads` folder is used for saving images related to the vehicle listings. The `app.js` file serves as the entry point of the backend application and contains the route handlers and controller logic.

## Frontend

The frontend of the SpinRent application is built with React and Vite. It uses React Router for routing and Axios for making HTTP requests to the backend API. The frontend code is located in the `SpinRent` folder.

The frontend code is organized into different components that are responsible for different parts of the application. These components include login, registration, homepage, vehicle details, booking, and user profile management. The `SpinRent` folder also includes a `context` folder which contains the `UserContext` used for managing user authentication state across the application.

## Usage

- Register: Use the registration form to create a new account.
- Login: Use the login form to log in to an existing account.
- View Vehicle Listings: Browse and view available vehicle listings.
- View Vehicle Details: Click on a vehicle listing to view its details.
- Make Booking: Select a rental period and make a booking

 for a vehicle.
- Manage User Profile: Update user information, view booking history, and logout.

## Contributing

Contributions to SpinRent are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.


**Note**: This readme is a general overview of the SpinRent project and may not include all the specific details of the code implementation. Please refer to the individual code files for more specific information.
