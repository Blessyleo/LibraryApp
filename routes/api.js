const express = require('express');
const router = express.Router(); //routing function
const DATA = require('../models/book');
const UserDATA = require('../models/user');
const jwt = require('jsonwebtoken');


//books full list read
router.get('/api/booklist', async (req, res) => {
    try {
        const list = await DATA.find()
        res.send(list);
    } catch (error) {
        console.log(error)
    }
})

// single book
router.get('/api/book/:id', async (req, res) => {
    try {
        let id = req.params.id
        const singleBook = await DATA.findById(id);
        res.send(singleBook);
    } catch (error) {
        console.log(error)
    }
})

//book add
router.post('/api/book', async (req, res) => {
    try {
        console.log(req.body);
        let item = { //to switch and data fetch from front end in server
            title: req.body.title,
            author: req.body.author,
            type: req.body.type
        }


        const newBook = new DATA(item); //to check incoming data
        const saveBook = await newBook.save(); //mongodb save
        res.send(saveBook);

    } catch (error) {
        console.log(error);
    }
})


// book delete
router.delete('/api/book/:id', async (req, res) => {
    try {
        //  let id = req.params.id;
        //  const deleteStudent = await DATA.findByIdAndDelete(id);
        const deleteBook = await DATA.deleteOne({ _id: req.params.id });
        res.send(deleteBook);
    } catch (error) {
        console.log(error)
    }
})



// book update

router.put('/api/book', async (req, res) => {
    try {

        let id = req.body._id
        let item = {  //to fetch and save data from front end in server
            title: req.body.title,
            author: req.body.author,
            type: req.body.type
        }
        let updateData = { $set: item }

        const updateBook = await DATA.findByIdAndUpdate({ _id: id }, updateData)
        res.send(updateBook)
    } catch (error) {
        console.log(error)

    }
})


//user add
router.post('/api/signup', async (req, res) => {
    try {
        console.log(req.body);
        let item = { //to switch and data fetch from front end in server
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const newUser = new UserDATA(item); //to check incoming data
        const saveUser = await newUser.save(); //mongodb save
        res.send(saveUser);

    } catch (error) {
        console.log(error);
    }
})

router.post('/api/login', async (req, res) => {
    try {

        let user = await UserDATA.findOne({ email: req.body.email, password: req.body.password })

        if (!user) {
            return res.json({ message: "Invalid Credentials" });
        }
        let token = jwt.sign(user.email, 'secretcode'); //create token
        res.send({ token });

        // return res.json({ message: "User Logged in Successfully" });
     

    } catch (error) {
        console.log(error);
    }
})






module.exports = router;