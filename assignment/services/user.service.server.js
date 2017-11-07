/**
 * Created by kamat on 10/24/2017.
 */

module.exports = function (app) {

  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  //var mockdata = require("./mock.data");
  //var users = mockdata.users;
  var userModel = require("../model/user/user.model.server");

  function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user).then(function (user) {
      res.json(user);
    });
  }

  function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    var user = null;
    if(username != undefined && password != undefined)
      userModel.findUserByCredentials(username, password).then(function (user) {
        if(user)
          res.json(user);
        else
          res.status(404).send("No user");
      });
    else if(username != undefined)
      userModel.findUserByUsername(username).then(function (user) {
        if(user)
          res.json(user);
        else
          res.status(404).send("No user");
      });
  }

  function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel.findUserById(userId).then(function (user) {
      if(user)
        res.json(user);
      else
        res.status(404).send("No user");
    });
  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var userNew = req.body;

    userModel.updateUser(userId, userNew).then(function (response) {
      if(response.modifiedCount == 1)
        res.json("User updated");
      else
        res.status(404).send("User cannot be updated");
    });
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];

    userModel.deleteUser(userId).then(function (response) {
      if(response.deletedCount == 1)
        res.json("User deleted");
      else
        res.status(404).send("User cannot be deleted");
    });
  }
}
