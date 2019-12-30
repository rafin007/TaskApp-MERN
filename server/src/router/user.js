const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/auth');

const User = require('../models/User');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    // user.save().then(() => res.status(201).send(user)).catch(error => res.status(400).send(error));
    try {
        const token = await user.generateAuthToken();
        await user.save();
        res.send({ user, token });
    }
    catch (error) {
        res.status(400).send();
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.checkCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    }
    catch (error) {
        res.status(400).send();
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    }
    catch (error) {
        res.status(500).send();
    }
});

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }
    catch (error) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    // User.find({}).then(users => res.send(users)).catch(error => res.status(500).send(error));
    res.send(req.user);
});

// router.get('/users/:id', (req, res) => {
//     const id = req.params.id;
//     User.findById(id).then(user => {
//         if (!user) {
//             return res.status(404).send({ error: "User not found!" });
//         }
//         res.send(user);

//     }).catch(error => res.status(400).send(error));
// });

router.patch('/users/me', auth, async (req, res) => {
    // const user = req.body;

    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const userFields = Object.keys(req.body);
    const isAllowed = userFields.every(field => allowedUpdates.includes(field));

    if (!isAllowed) {
        return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
        userFields.forEach(field => req.user[field] = req.body[field]);

        await req.user.save();
        res.send(req.user);
    }
    catch (error) {
        res.status(400).send();
    }

    //---------------------NOT DONE THIS WAY TO USE THE MIDDLEWARES ON MONGOOSE SCHEMA----------------------
    // User.findByIdAndUpdate(id, user, { new: true, runValidators: true }).then(user => {
    //     if (!user) {
    //         return res.status(404).send("User not found!");
    //     }
    //     res.send(user);
    // }).catch(error => res.status(400).send(error));
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    }
    catch (error) {
        res.status(400).send();
    }
});

module.exports = router;