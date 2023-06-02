# Project Title

**Blog Web App**

## Description

This project is a web application that allows displaying and creating blog posts. It is built using `Node.js` and `Express` as the web application framework. The application uses a `MongoDB` database to store the post data.

The application offers the following features:

- Display the home page with a list of posts.
- Display individual post pages with details and full content.
- Create new posts using a creation form.
- Display an "About" page with information about the blog.
- Display a contact page for users to get in touch.
- Redirect to an external link related to the blog.
- Upload images and rich content for each post.

## Installation

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the project's root folder.
3. Run the following command to install the dependencies:
npm install

## Technologies and Dependencies Used
- Node.js
- Express
- MongoDB
- Mongoose

## Folder Structure

- `public`: Contains static files such as images, CSS stylesheets, and client-side JavaScript files.
- `views`: Contains the EJS templates for the different pages of the application.
- `models`: Contains the data schema for posts using Mongoose.
- `routes`: Contains the route definitions and controllers using Express.
- `utils`: Contains helper functions used in the application.
- `config.js`: Configuration file for the MongoDB database connection.

## Usage

1. Configure the MongoDB database connection in the `config.js` file.
2. Start the server locally by running the following command:
node app.js

3. Open your web browser and access the following URL: `http://localhost:3001`.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch with the name of your feature: `git checkout -b new-feature`.
3. Make your modifications and improvements to the code.
4. Commit your changes: `git commit -m 'Add a new feature'`.
5. Push the branch: `git push origin new-feature`.
6. Open a Pull Request in this repository.

