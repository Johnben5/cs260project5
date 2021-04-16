const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");
const multer = require('multer');

const User = users.model;
const validUser = users.valid;

const upload = multer({
    dest: '../frontEnd/public/images/',
    limits: {
        fileSize: 10000000
    }
});

// Schema and model for items
const itemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    name: String,
    path: String,
    price: String,
    condition: String,
    description: String,
})
const Item = mongoose.model('Item', itemSchema);



router.post('/photos', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

router.post('/:userID', validUser, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.userID });
        if (!User) {
            res.send(404);
            return;
        }
        let item = new Item({
            user: user,
            name: req.body.name,
            path: req.body.path,
            price: req.body.price,
            condition: req.body.condition,
            description: req.body.description,
        });
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:userID', async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.userID });
        if (!user) {
            res.send(404);
            return;
        }
        let items = await Item.find({ user: user });
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:userID/:itemID', async (req, res) => {
    try {
        let item = await Item.findOne({ _id: req.params.itemID, user: req.params.userID });
        if (!item) {
            res.send(404);
            return;
        }
        await item.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: Item,
};