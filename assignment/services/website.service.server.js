/**
 * Created by kamat on 10/24/2017.
 */

module.exports = function (app) {
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var mockdata = require("./mock.data");
  var websites = mockdata.websites;

  function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;
    website["developerId"] = userId;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.json(website);
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    var websitesForUser = websites.filter(website => website.developerId == userId);
    res.json(websitesForUser);
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    var website = websites.find(website => website._id == websiteId);
    if(website)
      res.json(website);
    else
      res.status(404).send("No website with given id.");
  }

  function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var websiteNew = req.body;

    let wIndex = websites.findIndex(w => w._id == websiteId);
    if(wIndex != -1){
      websites[wIndex] = websiteNew;
      res.json("Website updated");
    }
    else
      res.status(404).send("Website cannot be updated");
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];

    let wIndex = websites.findIndex(w => w._id == websiteId);
    if(wIndex != -1){
      websites.splice(wIndex, 1);
      res.json("Website deleted");
    }
    else
      res.status(404).send("Website cannot be deleted");
  }
};
