/**
 * Created by kamat on 10/24/2017.
 */

module.exports = function (app) {

  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname + '/../../public/uploads' });

  var mockdata = require("./mock.data");
  var widgets = mockdata.widgets;

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/page/:pageId/widget", reorderWidgets);
  app.post("/api/upload", upload.single('myFile'), uploadImage);

  function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widget["pageId"] = pageId;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.json(widget);
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    var widgetsForPage = widgets.filter(widget => widget.pageId == pageId);
    res.json(widgetsForPage);
  }

  function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(widget => widget._id == widgetId);
    if(widget)
      res.json(widget);
    else
      res.status(404).send("No widget with given id.");
  }

  function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widgetNew = req.body;

    let wIndex = widgets.findIndex(w => w._id == widgetId);
    if(wIndex != -1){
      widgets[wIndex] = widgetNew;
      res.json("Widget updated");
    }
    else
      res.status(404).send("Widget cannot be updated");
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];

    let wIndex = widgets.findIndex(w => w._id == widgetId);
    if(wIndex != -1){
      widgets.splice(wIndex, 1);
      res.json("Widget deleted");
    }
    else
      res.status(404).send("Widget cannot be deleted");
  }

  function reorderWidgets(){
    var pageId = req.params['pageId'];
    var iIndex = req.query['initial'];
    var fIndex = req.query['final'];
    var widgetsForPage = widgets.filter(widget => widget.pageId == pageId);

    if(iIndex < widgetsForPage.length && fIndex < widgetsForPage.length){
      var insertWidget = widgetsForPage[iIndex];
      var inPlaceOf = widgetsForPage[fIndex];
      widgetsForPage.splice(iIndex, 1);
      var insertIndex = widgetsForPage.indexOf(inPlaceOf);
      widgetsForPage.splice(insertIndex, 0, insertWidget);

      res.json(widgetsForPage);
    }
    else
      res.status(404).send("Widgets cannot be re-ordered.");
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

    let wId = widgets.findIndex(widget => widget._id == widgetId);
    widgets[wId]['width'] = width;
    widgets[wId]['url'] = '/uploads/' + filename;

    var callbackUrl   = "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
    res.redirect(callbackUrl);
  }
};
