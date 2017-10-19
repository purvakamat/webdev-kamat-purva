/**
 * Created by kamat on 10/9/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetService {

  widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
      "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
      "url": "https://youtube/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
  ]


  api = {
    'createWidget'   : this.createWidget,
    'findWidgetsByPageId' : this.findWidgetsByPageId,
    'findWidgetById' : this.findWidgetById,
    'updateWidget' : this.updateWidget,
    'deleteWidget' : this.deleteWidget
  };

  createWidget(pageId : string, widget : any){
    widget["pageId"] = pageId ;
    widget["_id"] = Math.floor(Math.random() * 1000).toString();
    this.widgets.push(widget);
    return widget["_id"];
  }

  findWidgetsByPageId(pageId : string){
    return this.widgets.filter(widget => widget.pageId == pageId);
  }

  findWidgetById(widgetId : string){
    return this.widgets.find(widget => widget._id == widgetId);
  }

  updateWidget(widgetId : string, widget : any){
    let wId = this.widgets.findIndex(w => w._id == widgetId);
    if(wId != -1){
      this.widgets[wId] = widget;
    }
  }

  deleteWidget(widgetId : string){
    let wId = this.widgets.findIndex(w => w._id == widgetId);
    if(wId != -1){
      this.widgets.splice(wId,1);
    }
  }
}
