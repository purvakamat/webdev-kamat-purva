/**
 * Created by kamat on 10/24/2017.
 */

module.exports = function (app) {
  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  var mockdata = require("./mock.data");
  var widgets = mockdata.widgets;

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
};
