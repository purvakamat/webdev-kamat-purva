/**
 * Created by kamat on 10/24/2017.
 */

module.exports = function (app) {
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  var mockdata = require("./mock.data");
  var pages = mockdata.pages;

  function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;
    page["websiteId"] = websiteId;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var pagesForWebsite = pages.filter(page => page.websiteId == websiteId);
    res.json(pagesForWebsite);
  }

  function findPageById(req, res) {
    var pageId = req.params['pageId'];
    var page = pages.find(page => page._id == pageId);
    if(page)
      res.json(page);
    else
      res.status(404).send("No page with given id.");
  }

  function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var pageNew = req.body;

    let pIndex = pages.findIndex(p => p._id == pageId);
    if(pIndex != -1){
      pages[pIndex] = pageNew;
      res.json("Page updated");
    }
    else
      res.status(404).send("Page cannot be updated");
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];

    let pIndex = pages.findIndex(p => p._id == pageId);
    if(pIndex != -1){
      pages.splice(pIndex, 1);
      res.json("Page deleted");
    }
    else
      res.status(404).send("Page cannot be deleted");
  }
};
