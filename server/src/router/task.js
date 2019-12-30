const express = require('express');
const router = new express.Router();

const auth = require('../middlewares/auth');

const Task = require('../models/Task');
const User = require('../models/User');

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        author: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    }
    catch (error) {
        res.status(400).send(error);
    }

    // task.save().then(() => res.send(task)).catch(error => res.status(400).send(error));
});

// router.get('/tasks', (req, res) => {
//     Task.find({}).then(tasks => res.send(tasks)).catch(error => res.status(500).send(error));
// });

router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate();
        res.send(req.user.tasks);
    }
    catch (error) {
        res.status(400).send();
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findOne({ _id: id, author: req.user._id });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }
    catch (error) {
        res.status(400).send();
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedFields = ['description', 'completed'];
    const taskFields = Object.keys(req.body);
    const isAllowed = taskFields.every(field => allowedFields.includes(field));

    if (!isAllowed) {
        return res.status(400).send({ error: "Invalid update" });
    }

    const id = req.params.id;

    try {
        const task = await Task.findOne({ _id: id, author: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        taskFields.forEach(field => task[field] = req.body[field]);
        await task.save();
        res.send(task);
    }
    catch (error) {
        res.status(400).send();
    }

    //---------------------NOT DONE THIS WAY TO USE THE MIDDLEWARES ON MONGOOSE SCHEMA----------------------
    // Task.findByIdAndUpdate(id, task, { new: true, runValidators: true }).then(task => {
    //     if (!task) {
    //         return res.status(404).send(task);
    //     }
    //     res.send(task);
    // }).catch(error => res.status(400).send(error));
});

// router.delete('/tasks/:id', (req, res) => {
//     const id = req.params.id;
//     Task.findByIdAndDelete(id).then(task => {
//         if (!task) {
//             return res.status(404).send();
//         }
//         res.send(task);
//     }).catch(error => res.status(500).send(error));
// });

router.delete('/tasks/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id: id, author: req.user._id });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }
    catch (error) {
        res.status(400).send();
    }
});

module.exports = router;