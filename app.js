const express = require('express'); //loads the express library
const app = express();

app.use(express.json()); // converts json data into javascript

// Demo data
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const orders = [
  { id: 1, userId: 1, item: 'Laptop' },
  { id: 2, userId: 1, item: 'Phone' },
  { id: 3, userId: 2, item: 'Tablet' }
];

// Collection endpoint

// this endpoint gets all users
app.get('/api/v1/users', (req, res) => {
  res.json(users);
});

// Single resource endpoint- gets one user
app.get('/api/v1/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id); // finds the user


    //in case user is not there
  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    });
  }

  res.json(user);
});

// Nested endpoint

//gets order of users
app.get('/api/v1/users/:id/orders', (req, res) => {
  const userOrders = orders.filter(
    o => o.userId == req.params.id
  );

  res.json(userOrders);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});