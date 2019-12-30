const express = require('express');
require('./db/mongoose');
const usersRouter = require('./router/user');
const tasksRouter = require('./router/task');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

//middlewares
app.use((req, res, next) => {
    // res.status(503).send("Site under maintenance");
    next();
});

//Users
app.use(usersRouter);

//TASKS
app.use(tasksRouter);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

//mongoose populate

const User = require('./models/User');
const Task = require('./models/Task');

// const myMongoose = async () => {
//     // //to fetch the author of a particular task

//     // const task = await Task.findById('5e06f10b3b96ff1df48a8476');
//     // await task.populate('author').execPopulate();
//     // console.log(task.author);

//     //to fetch the tasks of a particular author

//     const user = await User.findById('5e06f05115bebd167ca204ea');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);

// };

// myMongoose();


//bcrypt.js
// const myPass = async () => {
//     const bcrypt = require('bcryptjs');
//     const password = 'mypass123';

//     const hashedPassword = await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('mypass123', hashedPassword);
//     console.log(isMatch);
// }

// myPass();
