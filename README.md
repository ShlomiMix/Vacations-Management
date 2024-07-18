# 🌴 Vacation Deals Management

## Introduction

Vacation Deals Management is a web application designed to manage and sell vacation deals. The application includes an admin panel for managing vacations (add, edit, delete) and a user interface for customers to browse and purchase vacation deals.

## Table of Contents

- [Technologies](#technologies)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Getting Started](#getting-started)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Scripts](#scripts)
  - [Frontend Scripts](#frontend-scripts)
  - [Backend Scripts](#backend-scripts)
- [License](#license)

## Technologies

### Frontend

The frontend of this application is built with the following technologies:

- **React**: A JavaScript library for building user interfaces. ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript. ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
- **Redux Toolkit**: The official, recommended way to write Redux logic. ![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)
- **React Router DOM**: A collection of navigational components. ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)
- **Material-UI**: React components for faster and easier web development.
  - **@mui/material**: Material Design components for React. ![MUI](https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=white)
  - **@mui/icons-material**: Material Design icons for React.
  - **@mui/x-date-pickers**: Date and time pickers for Material-UI.
- **Emotion**: A library designed for writing CSS styles with JavaScript.
  - **@emotion/react**: Emotion's core functionality as a React library.
  - **@emotion/styled**: A styled component library built for Emotion.
- **Bytescale Upload Widget**: A React component for handling file uploads.
- **Chart.js**: Simple yet flexible JavaScript charting for designers & developers. ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chart-dot-js&logoColor=white)
- **React Chart.js 2**: A React wrapper for Chart.js.
- **Date-Fns**: Modern JavaScript date utility library.
- **Moment.js**: Parse, validate, manipulate, and display dates and times in JavaScript. ![Moment.js](https://img.shields.io/badge/Moment.js-5B3EAA?logo=moment-dot-js&logoColor=white)
- **JWT Decode**: A small browser library that helps decode JWTs token which are Base64Url encoded.
- **Notyf**: A minimalistic, responsive, vanilla JavaScript notification library.
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **React Icons**: Include popular icons in your React projects easily with `react-icons`. ![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?logo=react&logoColor=white)
- **React Datepicker**: A simple and reusable datepicker component for React.
- **React Papa Parse**: Fast and powerful CSV (delimited text) parser that gracefully handles large files and malformed input.
- **Axios**: Promise-based HTTP client for the browser and Node.js. ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
- **Web Vitals**: A library for measuring the quality of the user experience.

### Backend

The backend of this application is built with the following technologies:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node-dot-js&logoColor=white)
- **Express**: A minimal and flexible Node.js web application framework. ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript. ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
- **MySQL**: A relational database management system. ![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment. ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)
- **JWT (jsonwebtoken)**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **Express File Upload**: Simple express middleware for uploading files.
- **Express Rate Limit**: Basic IP rate-limiting middleware for Express.
- **CORS**: A node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **Dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **Joi**: Object schema description language and validator for JavaScript objects.
- **Striptags**: A simple function to strip HTML tags from a string.
- **Uploaded File Saver**: A utility for saving uploaded files.
- **Date-Fns**: Modern JavaScript date utility library.

## Getting Started

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/ShlomiMix/E-commerce.git
    ```

2. Navigate to the frontend directory:
    ```bash
    cd OnlineBrandsShop/frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd OnlineBrandsShop/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

## Scripts

### Frontend Scripts

- `npm start`: Starts the development server.
- `npm unit-test`: Runs unit tests using Mocha.
- `npm build`: Builds the app for production.
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm eject`: Removes the single build dependency from your project.

### Backend Scripts

- `npm start`: Starts the server using ts-node for development.
- `npm test`: Runs the backend tests using Mocha.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
