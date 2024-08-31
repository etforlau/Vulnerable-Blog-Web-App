# Blog Web App

A simple blog web application built with Node.js, Express.js, and EJS. The application allows users to create, view, edit, and delete blog posts. Currently, the posts are not persisted across sessions as no database is integrated in this version.



## Table of Contents

1. [Stack](#stack)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)

## Stack
- Node.js: JavaScript runtime used to build the server-side logic.
- Express.js: Web framework for Node.js, used to create the server, handle HTTP requests, define routes, and manage middleware.
- EJS: Templating engine for rendering dynamic HTML content.


## Features
- **Post Creation**: Users can create new blog posts.
- **Post Viewing**: The home page displays all existing posts.
- **Post Update/Delete**: Users can edit and delete existing posts.
## Installation

To run this project locally, you'll need Node.js and npm (Node Package Manager) installed. Follow the steps below to set up the project on your local machine:

```bash
  git clone https://github.com/ricardo-0103/Blog-Web-App.git
  cd Blog\ Web\ App/
  npm install 
```
    
## Usage
After installing the project, start the application with the following command:

```bash
  node index.js
```

The application will be available at http://localhost:3000.

![Home Page](images/home_page.png)

If you want to view or create a new blog, click in the "Create/View blogs" tag

![View Blogs](images/view_blogs.png)

In that page you can create, edit, view and delete any blog.
For example if you want to create a new blog, click on the Create button.

![Create Blogs](images/create_blog.png)

Once you have created your blog, you will be redirected to the blog page and you'll see all the blogs that have been created, including your last one.

If you want to edit a blog, you can click on the Edit button. You will be able to see the blog and change anything you want.

![Edit Blogs](images/edit_blog.png)

To read an already created blog, you can click on the View button of the blog that you are interested in.

![View Blog](images/view_specific_blog.png)

Finally, if you just want to delete a blog, click on that button.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please create an issue or submit a pull request. 
