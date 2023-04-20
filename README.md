# SQL To Do List

## Description

Duration: 2 Days

This project takes in a user input as a task and adds the task to a list. To mark the task as complete, click the 'Complete' button and the text will be striked through. To delete the task, click the 'Delete' button. Note, it will delete from the browser and database.

## Screen Shot

<img width="814" alt="ToDoAppFigma" src="https://user-images.githubusercontent.com/77410880/171068440-31595c5d-8721-426c-8aa1-5d4a03152700.png">

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Postgres](https://postgresapp.com/)
- [Postico](https://eggerapps.at/postico/)

## Installation

1. Clone repo
2. Run 'npm install' in terminal
3. Run 'npm install express' in terminal
4. Run 'npm install pg' in terminal
5. Run 'npm install body-parser' in terminal
6. Create database in Postico from todo.sql file
7. Run npm server/server.js file 
8. Localhost will be 5000 (Localhost:5000)

## Data Structure

```
├── README.md
├── package-lock.json
├── package.json
├── pseudocode.md
├── server
│   ├── modules
│   │   └── pool.js
│   ├── public
│   │   ├── css
│   │   │   └── style.css
│   │   ├── images
│   │   │   └── toDoAppFigma.png
│   │   ├── index.html
│   │   ├── scripts
│   │   │   └── client.js
│   │   └── vendors
│   │       └── jquery.js
│   ├── routes
│   │   └── todo.router.js
│   └── server.js
└── todo.sql
```

## Usage
This to do tasks web application is intended for educational use to gain knowledge on the following technologies.

1. Node.js
2. Express
3. Ajax calls 
4. Server routes
5. jQuery

## Built With

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. 

## Support
If you have suggestions or issues, please connect with me on [LinkedIn](https://www.linkedin.com/in/savon-huynh).
