const express = require('express');
const router = express.Router();
const fs = require('fs');

// Save users to file 
function saveUser(users) {
fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// Get users from file 
function getUser() {
const data = fs.readFileSync('users.json', 'utf8');
return JSON.parse(data);
}

// Temp data storage for users
// let users = [];



// // get all users 
// router.get('/', (req, res) => {
//     // res.send({users});
//     res.json(users);
// });



// // post: Create users 
// router.post('/', (req, res) => {
//     const user = req.body;
//     users.push(user);

//     res.json({
//         message: 'User created successfully',
//         users
//     })
// });


// Create a new user
router.post('/', (req, res) => {

const { name, age, email } = req.body;

if (!name || !age || !email) {
return res.json({
    message: 'Validation failed',
    error: {
        ...(!name && { name: 'Name is required' }),
        ...(!age && { age: 'Age is required' }),
        ...(!email && { email: 'Email is required' }),
    }
});
}


const users = getUser();
const newUser = {
    id:Date.now(),
    ...req.body
    }; 


// Add the new user to the users array and save it to the file
users.push(newUser);
saveUser(users);
res.json({
message: 'User Added Successfully',
totalUsers:users.length,
users
});

});


// Get all users
router.get('/', (req, res) => {
const users = getUser();
res.json(users);
}); 


// Update Users
router.patch('/:id', (req, res) => {
    // get user id from file
    const users = getUser();
    // get user from url
    const id = Number(req.params.id);
    // find user by id
    const userIndex = users.findIndex(user => user.id === id);

    // check if user does not exist
    if (userIndex === -1) {
        return res.json({
            message: 'User not found'
        });
    }
    // update user data
    users[userIndex] = {
        // keep existing data and update with new data from request body
        ...users[userIndex],
        // return all data from request body and overwrite existing data with same keys
        ...req.body
    };
    // save updated users to file
    saveUser(users);
    res.json({
        message: 'User updated successfully',
        user: users[userIndex]
    });
});

// Delete user
router.delete('/:id', (req, res) => {
    const users = getUser();
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);

    // check if user does not exist
    if (userIndex === -1) {
        return res.json({
            message: 'User not found'
        });
    }

    // remove user from array
    const deletedUser = users.splice(userIndex, 1)[0];
    // save updated users to file
    saveUser(users);
    res.json({
        message: 'User deleted successfully',
        user: deletedUser
    });
});

// this is use top export the router to be used in other files, such as server.js
module.exports = router;