const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  return res.status(200).send({ users: db.users });
});

router.post("/users", (req, res) => {
  const { username, age, address } = req.body;
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].username === username.toLowerCase()) {
      return res.status(400).send({message: 'Username already exist' });
    }
  }
  const user = {
    id: db.users.length + 1,
    username: username.toLowerCase(),
    age,
    address,
  };
  db.users.push(user);
  return res.status(201).send({ id: user.id });
});

router.patch('/users/:username', (req, res) => {
  const username = req.params.username;
  const { age, address } = req.body;
  for (let i=0;i<db.users.length;i++) {
    if (db.users[i].username === username.toLowerCase()) {
      if (age) {
        db.users[i].age = age;
      }
      if (address) {
        db.users[i].address = address;
      }
    }
  }
  return res.status(200).send({ message: `user with username: ${username} updated successfully`});
});

router.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  for (let i=0;i<db.users.length;i++) {
    if (db.users[i].id === parseInt(id)) {
      db.users.splice(i, 1);
    }
  }
  return res.status(200).send({message: `user with id ${id} deleted successfully`});
});



module.exports = router;
