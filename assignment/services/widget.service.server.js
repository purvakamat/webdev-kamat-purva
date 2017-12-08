/**
 * Created by kamat on 10/24/2017.
 */

module.exports = function (app) {

  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname + '/../../dist/assets/uploads' });

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/page/:pageId/widget", reorderWidgets);
  app.post("/api/upload", upload.single('myFile'), uploadImage);

  var widgetModel = require("../model/widget/widget.model.server");

  function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widgetModel.createWidget(pageId, widget).then(function (widget) {
      res.json(widget);
    });
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    widgetModel.findAllWidgetsForPage(pageId).then(function (widgetsForPage) {
      widgetsForPage.sort(function (a,b) {
        return a.index - b.index;
      })
      res.json(widgetsForPage);
    });
  }

  function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel.findWidgetById(widgetId).then(function (widget) {
      if(widget)
        res.json(widget);
      else
        res.status(404).send("No widget with given id.");
    });
  }

  function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widgetNew = req.body;

    widgetModel.updateWidget(widgetId, widgetNew).then(function (response) {
      if(response.n >0 || response.nModified > 0)
        res.json("Widget updated");
      else
        res.status(404).send("Widget was not updated");
    });
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];

    widgetModel.deleteWidget(widgetId).then(function (response) {
      if(response.deletedCount > 0)
        res.json("Widget deleted");
      else
        res.status(404).send("Widget cannot be deleted");
    });
  }

  function reorderWidgets(req, res){
    var pageId = req.params['pageId'];
    var iIndex = req.query['initial'];
    var fIndex = req.query['final'];

    widgetModel.findAllWidgetsForPage(pageId).then(function (widgetsForPage) {
      widgetsForPage.sort(function (a,b) {
        return a.index - b.index;
      })
      if(iIndex < widgetsForPage.length && fIndex < widgetsForPage.length){
        var insertWidget = widgetsForPage[iIndex];
        var inPlaceOf = widgetsForPage[fIndex];
        widgetsForPage.splice(iIndex, 1);
        var insertIndex = widgetsForPage.indexOf(inPlaceOf);
        widgetsForPage.splice(insertIndex, 0, insertWidget);
        saveWidgetOrder(widgetsForPage)
        res.json(widgetsForPage);
      }
      else
        res.status(404).send("Widgets cannot be re-ordered.");
    });
  }

  function saveWidgetOrder(widgetsForPage) {
    var count= widgetsForPage.length;
    for(var i=0; i<count; i++){
      widgetsForPage[i].index = i;
    }
    widgetsForPage.forEach(function(widget) {
      widgetModel.updateWidget(widget._id, widget).then(function (response) {
      });
    });
    return;
  }

  function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId        = req.body.userId;
    var websiteId     = req.body.websiteId;
    var pageId        = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var widget = widgetModel.findWidgetById(widgetId);
    widget.width = width;
    widget.url = "assets/uploads/"+filename;

    widgetModel.updateWidget(widgetId, widget).then(function (response) {
      if(response.n >0 || response.nModified > 0){
        var callbackUrl   = "/user/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
        res.redirect(callbackUrl);
      }
      else
        res.status(404).send("Widget was not updated");
    });
  }
};
