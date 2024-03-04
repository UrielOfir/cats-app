# Cats App

## Features

- **Cat Lookup**: Browse through a comprehensive database of cats, including details like name, birth date, location, and preferences.
- **Vote for Cats**: Show your love for your favorite cats by voting for them. See which cats are the most popular among the community.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following tools installed:

- Docker: Required for running the database and ensuring a consistent development environment.

### Installation

Follow these steps to get your development environment set up:

1. **Clone the repository**

   ```bash
   git clone https://github.com/UrielOfir/cats-app.git
   cd cats-app
   ```

2. **Running the Database with Docker**

   Build and start the database using Docker:

   ```bash
   docker-compose build
   docker-compose up -d
   ```

3. **Environment Setup**   
   To run the Cats App successfully, you'll need to configure your environment variables for both development and testing environments. The project includes example environment files to guide you through this process.
   #### Creating Environment Files
    a. **Development Environment File**:
   - Navigate to the `backend` directory.
   - Locate the `example.env` file. This file contains a template of the environment variables needed for the application to run.
   - Create a new file named `.env` in the same directory.
   - Copy the contents of `example.env` into your `.env` file.
   
   b. **Test Environment File**:
   - In the `backend` directory, find the `example.env.test` file. This serves as a template for the environment variables required during testing.
   - Create a new file named `.env.test` in the same directory.
   - Copy the contents from `example.env.test` to `.env.test`.

    ##### Note on Environment Variables
    The environment variables include configurations for your database, API keys, and other sensitive information that should not be shared publicly. Ensure that your `.env` and `.env.test` files are added to your `.gitignore` to prevent them from being committed to your version control system.

4. **Setting up the Application**

   Install dependencies and run the frontend and backend applications:

   - Install dependencies for both the backend and frontend:

     ```bash
     npm run install:all
     ```

   - Start the application in development mode with hot reload enabled:

     ```bash
     npm run start:dev
     ```

## Technologies

This project is built using the following technologies:

- **Vite**: A fast, modern build tool for JavaScript applications.
- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: A toolset for efficient Redux development.
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **PostgreSQL**: An open source object-relational database system.

## API Documentation with Swagger

The Cats App backend is equipped with Swagger, a powerful tool for interactive API documentation. Swagger allows you to test out the API endpoints directly through your web browser without needing any additional tools like Postman. Here's how you can access and use the Swagger UI:

### Accessing Swagger UI

1. Ensure the backend application is running. If you haven't started the application yet, refer to the "Run the frontend and backend apps" section above.

2. Open your web browser and navigate to the Swagger UI by visiting [http://localhost:3000/api](http://localhost:3000/api).

### Using Swagger UI

- **Explore API Endpoints**: The Swagger UI provides a list of all available API endpoints, including descriptions of what they do, the request parameters they accept, and the response models they return.

- **Try Out Endpoints**: You can execute API requests directly from the Swagger UI. To do so:

  1. Click on an endpoint to expand its details.
  2. Click the "Try it out" button.
  3. Fill in any required parameters.
  4. Click "Execute" to send the request. The response will be displayed directly in the Swagger UI.

- **Authentication**: If any endpoints require authentication, Swagger UI will guide you through the necessary steps to authenticate your requests.

### Benefits of Using Swagger

- **Ease of Use**: Quickly test and explore backend functionalities without writing any code or using additional tools.
- **Real-time Documentation**: Swagger UI reflects the current state of your API, ensuring that the documentation is always up to date.
- **Interactive Learning**: For developers new to the Cats App project, Swagger serves as an interactive learning tool, making it easier to understand the capabilities of the backend services.

Swagger UI is an invaluable tool for both development and testing. It simplifies the process of interacting with the Cats App backend, making it accessible to developers and testers of all skill levels.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

_Thank you for exploring the Cats App. We hope you enjoy using it as much as we enjoyed building it!_
