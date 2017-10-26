/**
 * Created by kamat on 10/24/2017.
 */

module.exports = function (app) {

  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  var mockdata = require("./mock.data");
  var users = mockdata.users;

  function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.json(user);
  }

  function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    var user = null;
    if(username != undefined && password != undefined)
      user = findUserByCredentials(username, password);
    else if(username != undefined)
      user = findUserByUsername(username);

    if(user)
      res.json(user);
    else
      res.status(404).send("No user");
  }

  function findUserById(req, res) {
    var userId = req.params['userId'];
    var user = findUserbyID(userId);
    if(user)
      res.json(user);
    else
      res.status(404).send("No user");
  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var userNew = req.body;

    let uIndex = users.findIndex(u => u._id == userId);
    if(uIndex != -1){
      users[uIndex] = userNew;
      res.json("User updated");
    }
    else
      res.status(404).send("User cannot be updated");
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];

    let uIndex = users.findIndex(u => u._id == userId);
    if(uIndex != -1){
      users.splice(uIndex, 1);
      res.json("User deleted");
    }
    else
      res.status(404).send("User cannot be deleted");
  }

  function findUserbyID(userId) {
    return users.find(user => user._id == userId);
  }

  function findUserByUsername(username) {
    return users.find(user => user.username == username);
  }

  function findUserByCredentials(username, password){
    return users.find(user => user.username == username && user.password == password);
  }
}
